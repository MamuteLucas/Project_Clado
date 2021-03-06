/*Copyright (c) 2013-2016, Rob Schmuecker
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
this list of conditions and the following disclaimer in the documentation
and/or other materials provided with the distribution.

* The name Rob Schmuecker may not be used to endorse or promote products
derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL MICHAEL BOSTOCK BE LIABLE FOR ANY DIRECT,
INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/
var modifiedFilo = null,
    tabOptions_click = null,
    colorModifiedFilo = null,
    initialDiagram = null,
    initialNodes = null,
    indexInitialNodes = null,
    firstLoad = true,
    results_bySearch = 0,
    first_filosNotSaved = false,
    filos_notSaved = [],
    count_add = 0,
    actions = [[], [] ,[], []],
    draggedNode = [null, null, null, null, null];

function startDiagram(cladogram, user_logged, clado_id) {
    // Get JSON data
    treeJSON = d3.json(cladogram, function(treeData) {

        //var usada para permitir que o Node seja arrastado somente quando o botao esquerdo do mouse for usado nele
        var permitionDrag = true;
        //var usada pra saber se o Node selecionado eh ou nao 'parent' do Node arrastado
        var diferentNode = false;
        //var usada pra saber se o mouse esta dentro ou fora do circulo fantasma (circulo vermelho)
        //esta var guarda duas posicoes pois a ultima alterada sempre sera zero
        var mouseIn = [null, null];
        //var usada pra saber o ultimo indice alterado de mouseIn
        var lastModifiedIndexMouseIn = null;

        //muda o valor de LMIMI (lastModifiedIndexMouseIn)
        function changeValueOfLMIMI() {
            if (mouseIn[0] === null) {
                lastModifiedIndexMouseIn = 0;
            } else if (mouseIn[1] === null) {
                lastModifiedIndexMouseIn = 1;
            } else if (lastModifiedIndexMouseIn == 0) {
                lastModifiedIndexMouseIn = 1;
            } else if (lastModifiedIndexMouseIn == 1) {
                lastModifiedIndexMouseIn = 0;
            }
        }

        // Calculate total nodes, max label length
        var totalNodes = 0;
        var maxLabelLength = 0;
        // variables for drag/drop
        var selectedNode = null;
        var draggingNode = null;
        // panning variables
        var panSpeed = 200;
        var panBoundary = 20; // Within 20px from edges will pan when dragging.
        // Misc. variables
        var i = 0;
        var duration = 750;
        var root;

        // size of the diagram
        var viewerWidth = $(document).width();
        var viewerHeight = $(document).height();

        var tree = d3.layout.tree()
            .size([viewerHeight, viewerWidth]);

        // define a d3 diagonal projection for use by the node paths later on.
        var diagonal = d3.svg.diagonal()
            .projection(function(d) {
                return [d.y, d.x];
            });

        // A recursive helper function for performing some setup by walking through all nodes

        function visit(parent, visitFn, childrenFn) {
            if (!parent) return;

            visitFn(parent);

            var children = childrenFn(parent);
            if (children) {
                var count = children.length;
                for (var i = 0; i < count; i++) {
                    visit(children[i], visitFn, childrenFn);
                }
            }
        }

        // Call visit function to establish maxLabelLength
        visit(treeData, function(d) {
            totalNodes++;
            maxLabelLength = Math.max(d.name.length, maxLabelLength);

        }, function(d) {
            return d.children && d.children.length > 0 ? d.children : null;
        });


        // sort the tree according to the node names

        function sortTree() {
                tree.sort(function(a, b) {
                    return b.name.toLowerCase() < a.name.toLowerCase() ? 1 : -1;
                });
            }
            // Sort the tree initially incase the JSON isn't in a sorted order.
        sortTree();

        // TODO: Pan function, can be better implemented.

        function pan(domNode, direction) {
            var speed = panSpeed;
            if (panTimer) {
                clearTimeout(panTimer);
                translateCoords = d3.transform(svgGroup.attr("transform"));
                if (direction == 'left' || direction == 'right') {
                    translateX = direction == 'left' ? translateCoords.translate[0] + speed : translateCoords.translate[0] - speed;
                    translateY = translateCoords.translate[1];
                } else if (direction == 'up' || direction == 'down') {
                    translateX = translateCoords.translate[0];
                    translateY = direction == 'up' ? translateCoords.translate[1] + speed : translateCoords.translate[1] - speed;
                }
                scaleX = translateCoords.scale[0];
                scaleY = translateCoords.scale[1];
                scale = zoomListener.scale();
                svgGroup.transition().attr("transform", "translate(" + translateX + "," + translateY + ")scale(" + scale + ")");
                d3.select(domNode).select('g.node').attr("transform", "translate(" + translateX + "," + translateY + ")");
                zoomListener.scale(zoomListener.scale());
                zoomListener.translate([translateX, translateY]);
                panTimer = setTimeout(function() {
                    pan(domNode, speed, direction);
                }, 50);
            }
        }

        // Define the zoom function for the zoomable tree

        function zoom() {
            svgGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }


        // define the zoomListener which calls the zoom function on the "zoom" event constrained within the scaleExtents
        var zoomListener = d3.behavior.zoom().scaleExtent([0.1, 3]).on("zoom", zoom);

        function initiateDrag(d, domNode) {
            draggingNode = d;
            d3.select(domNode).select('.ghostCircle').attr('pointer-events', 'none');
            d3.selectAll('.ghostCircle').attr('class', 'ghostCircle show');
            d3.select(domNode).attr('class', 'node activeDrag');

            svgGroup.selectAll("g.node").sort(function(a, b) { // select the parent and sort the path's
                if (a.id != draggingNode.id) return 1; // a is not the hovered element, send "a" to the back
                else return -1; // a is the hovered element, bring "a" to the front
            });
            // if nodes has children, remove the links and nodes
            if (nodes.length > 1) {
                // remove link paths
                links = tree.links(nodes);
                nodePaths = svgGroup.selectAll("path.link")
                    .data(links, function(d) {
                        return d.target.id;
                    }).remove();
                // remove child nodes
                nodesExit = svgGroup.selectAll("g.node")
                    .data(nodes, function(d) {
                        return d.id;
                    }).filter(function(d, i) {
                        if (d.id == draggingNode.id) {
                            return false;
                        }
                        return true;
                    }).remove();
            }

            // remove parent link
            parentLink = tree.links(tree.nodes(draggingNode.parent));
            svgGroup.selectAll('path.link').filter(function(d, i) {
                if (d.target.id == draggingNode.id) {
                    return true;
                }
                return false;
            }).remove();

            dragStarted = null;
        }

        // define the baseSvg, attaching a class for styling and the zoomListener
        var baseSvg = d3.select("#tree-container").append("svg")
            .attr("width", viewerWidth)
            .attr("height", viewerHeight)
            .attr("class", "overlay")
            .call(zoomListener);

        // Define the drag listeners for drag/drop behaviour of nodes.
        dragListener = d3.behavior.drag()
            .on("dragstart", function(d) {
                if (d == root) {
                    return;
                }
                dragStarted = true;
                nodes = tree.nodes(d);
                d3.event.sourceEvent.stopPropagation();
                // it's important that we suppress the mouseover event on the node being dragged.
                //Otherwise it will absorb the mouseover event and the underlying node will not detect it
                //d3.select(this).attr('pointer-events', 'none');
            })
            .on("drag", function(d) {
                if (permitionDrag) {
                    if (d == root) {
                        return;
                    }
                    if (dragStarted) {
                        domNode = this;
                        initiateDrag(d, domNode);

                        draggedNode[0] = d.name;
                        draggedNode[1] = d.category;
                        draggedNode[2] = d.parent.name;
                        draggedNode[3] = d.parent.category;
                        draggedNode[4] = d.creator;
                        
                    }

                    // get coords of mouseEvent relative to svg container to allow for panning
                    relCoords = d3.mouse($('svg').get(0));
                    if (relCoords[0] < panBoundary) {
                        panTimer = true;
                        pan(this, 'left');
                    } else if (relCoords[0] > ($('svg').width() - panBoundary)) {

                        panTimer = true;
                        pan(this, 'right');
                    } else if (relCoords[1] < panBoundary) {
                        panTimer = true;
                        pan(this, 'up');
                    } else if (relCoords[1] > ($('svg').height() - panBoundary)) {
                        panTimer = true;
                        pan(this, 'down');
                    } else {
                        try {
                            clearTimeout(panTimer);
                        } catch (e) {

                        }
                    }

                    d.x0 += d3.event.dy;
                    d.y0 += d3.event.dx;
                    var node = d3.select(this);
                    node.attr("transform", "translate(" + d.y0 + "," + d.x0 + ")");
                    updateTempConnector();
                }
            }).on("dragend", function(d) {
                if (d == root) {
                    return;
                }
                domNode = this;
                if (selectedNode) {
                    // now remove the element from the parent, and insert it into the new elements children
                    var index = draggingNode.parent.children.indexOf(draggingNode);
                    if (index > -1) {
                        draggingNode.parent.children.splice(index, 1);
                    }
                    if (typeof selectedNode.children !== 'undefined' || typeof selectedNode._children !== 'undefined') {
                        if (typeof selectedNode.children !== 'undefined') {
                            selectedNode.children.push(draggingNode);
                        } else {
                            selectedNode._children.push(draggingNode);
                        }
                    } else {
                        selectedNode.children = [];
                        selectedNode.children.push(draggingNode);
                    }
                    // Make sure that the node being added to is expanded so user can see added node is correctly moved
                    expand(selectedNode);
                    sortTree();
                    endDrag();
                } else {
                    endDrag();
                }
            });

        function endDrag() {
            selectedNode = null;
            d3.selectAll('.ghostCircle').attr('class', 'ghostCircle');
            d3.select(domNode).attr('class', 'node');
            // now restore the mouseover event or we won't be able to drag a 2nd time
            d3.select(domNode).select('.ghostCircle').attr('pointer-events', '');
            updateTempConnector();
            if (draggingNode !== null) {
                update(root);
                centerNode(draggingNode);

                svgOnMouseDown_dotNode();
                draggingNode = null;
            }
        }

        // Helper functions for collapsing and expanding nodes.

        function collapse(d) {
            if (d.children) {
                d._children = d.children;
                d._children.forEach(collapse);
                d.children = null;
            }
        }

        function expand(d) {
            if (d._children) {
                d.children = d._children;
                d.children.forEach(expand);
                d._children = null;
            }
        }

        var overCircle = function(d) {
            selectedNode = d;
            updateTempConnector();
        };
        var outCircle = function(d) {
            selectedNode = null;
            updateTempConnector();
        };

        // Function to update the temporary connector indicating dragging affiliation
        var updateTempConnector = function() {
            var data = [];
            //a condicao (A1) entra quando tiver um Node selecionado e um Node arrastado
            if (draggingNode !== null && selectedNode !== null) {
                changeValueOfLMIMI();
                mouseIn[lastModifiedIndexMouseIn] = true;
                // have to flip the source coordinates since we did this for the existing connectors on the original tree
                data = [{
                    source: {
                        x: selectedNode.y0,
                        y: selectedNode.x0
                    },
                    target: {
                        x: draggingNode.y0,
                        y: draggingNode.x0
                    }
                }];
            } else if (draggingNode !== null && selectedNode === null) { //a condicao A1 entra quando tiver um Node arrastado
                changeValueOfLMIMI(); //e nenhum Node selecionado
                mouseIn[lastModifiedIndexMouseIn] = false;
            }
            var link = svgGroup.selectAll(".templink").data(data);

            link.enter().append("path")
                .attr("class", "templink")
                .attr("d", d3.svg.diagonal())
                .attr('pointer-events', 'none');

            link.attr("d", d3.svg.diagonal());

            link.exit().remove();
        };

        // Function to center node when clicked/dropped so node doesn't get lost when collapsing/moving
        //with large amount of children.

        function centerNode(source) {
            scale = zoomListener.scale();
            x = -source.y0;
            y = -source.x0;
            x = x * scale + viewerWidth / 2;
            y = y * scale + viewerHeight / 2;
            d3.select('g').transition()
                .duration(duration)
                .attr("transform", "translate(" + x + "," + y + ")scale(" + scale + ")");
            zoomListener.scale(scale);
            zoomListener.translate([x, y]);
        }

        // Toggle children function

        function toggleChildren(d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else if (d._children) {
                d.children = d._children;
                d._children = null;
            }
            return d;
        }

        // Toggle children on click.

        function click(d) {
            if (d3.event.defaultPrevented) return; // click suppressed
            d = toggleChildren(d);
            update(d);
            centerNode(d);

            svgOnMouseDown_dotNode();
        }

        function update(source) {
            // Compute the new height, function counts total children of root node and sets tree height accordingly.
            // This prevents the layout looking squashed when new nodes are made visible or looking sparse when nodes are removed
            // This makes the layout more consistent.
            var levelWidth = [1];
            var childCount = function(level, n) {

                if (n.children && n.children.length > 0) {
                    if (levelWidth.length <= level + 1) levelWidth.push(0);

                    levelWidth[level + 1] += n.children.length;
                    n.children.forEach(function(d) {
                        childCount(level + 1, d);
                    });
                }
            };
            childCount(0, root);
            var newHeight = d3.max(levelWidth) * 25; // 25 pixels per line
            tree = tree.size([newHeight, viewerWidth]);

            // Compute the new tree layout.
            var nodes = tree.nodes(root).reverse(),
                links = tree.links(nodes);

            // Set widths between levels based on maxLabelLength.
            nodes.forEach(function(d) {
                d.y = (d.depth * (maxLabelLength * 10)); //maxLabelLength * 10px
                // alternatively to keep a fixed scale one can set a fixed depth per level
                // Normalize for fixed-depth by commenting out below line
                // d.y = (d.depth * 500); //500px per level.
            });

            // Update the nodes
            node = svgGroup.selectAll("g.node")
                .data(nodes, function(d) {
                    return d.id || (d.id = ++i);
                });

            // Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter().append("g")
                .call(dragListener)
                .attr("class", "node")
                .attr("transform", function(d) {
                    return "translate(" + source.y0 + "," + source.x0 + ")";
                })
                .on('click', click);

            nodeEnter.append("circle")
                .attr('class', 'nodeCircle')
                .attr("r", 0)
                .style("fill", function(d) {
                    return d._children ? "lightsteelblue" : "#fff";
                });

            nodeEnter.append("text")
                .attr("x", function(d) {
                    return d.children || d._children ? -10 : 10;
                })
                .attr("dy", ".35em")
                .attr('class', 'nodeText')
                .attr("text-anchor", function(d) {
                    return d.children || d._children ? "end" : "start";
                })
                .text(function(d) {
                    return d.name;
                })
                .style("fill-opacity", 0);

            // phantom node to give us mouseover in a radius around it
            nodeEnter.append("circle")
                .attr('class', 'ghostCircle')
                .attr("r", 30)
                .attr("opacity", 0.2) // change this to zero to hide the target area
                .style("fill", "red")
                .attr('pointer-events', 'mouseover')
                .on("mouseover", function(node) {
                    overCircle(node);
                })
                .on("mouseout", function(node) {
                    outCircle(node);
                });
            //console.log(nodeEnter);

            // Update the text to reflect whether node has children or not.
            node.select('text')
                .attr("x", function(d) {
                    return d.children || d._children ? -10 : 10;
                })
                .attr("text-anchor", function(d) {
                    return d.children || d._children ? "end" : "start";
                })
                .text(function(d) {
                    return d.name;
                });

            // Change the circle fill depending on whether it has children and is collapsed
            node.select("circle.nodeCircle")
                .attr("r", 4.5)
                .style("fill", function(d) {
                    return d._children ? "lightsteelblue" : "#fff";
                });

            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function(d) {
                    return "translate(" + d.y + "," + d.x + ")";
                });

            // Fade the text in
            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function(d) {
                    return "translate(" + source.y + "," + source.x + ")";
                })
                .remove();

            nodeExit.select("circle")
                .attr("r", 0);

            nodeExit.select("text")
                .style("fill-opacity", 0);

            // Update the links
            var link = svgGroup.selectAll("path.link")
                .data(links, function(d) {
                    return d.target.id;
                });

            // Enter any new links at the parent's previous position.
            link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("d", function(d) {
                    var o = {
                        x: source.x0,
                        y: source.y0
                    };
                    return diagonal({
                        source: o,
                        target: o
                    });
                });

            // Transition links to their new position.
            link.transition()
                .duration(duration)
                .attr("d", diagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr("d", function(d) {
                    var o = {
                        x: source.x,
                        y: source.y
                    };
                    return diagonal({
                        source: o,
                        target: o
                    });
                })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach(function(d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });

            //a condicao (A2) entra caso o mouse seja solto dentro do circulo fantasma (circulo vermelho)
            if (mouseIn[0] != null && mouseIn[1] != null) {
                changeValueOfLMIMI();
                if (mouseIn[lastModifiedIndexMouseIn]) {
                    saveNewRoot(root, initialDiagram, cladogram, true);

                }
            }
        }

        function svgOnMouseDown_dotNode(){
          var allDotNodes = document.querySelectorAll(".node");

          for (var i = 0; i < allDotNodes.length; i++) {
            allDotNodes[i].addEventListener("mousedown", function(buttonPressed){
              $("#div_tabOptions").css("display", "none");
              permitionDrag = dotNode_onmousedown(buttonPressed);

            })
          }
        }

        // Append a group which holds all nodes and which the zoom Listener can act upon.
        var svgGroup = baseSvg.append("g");

        // Define the root
        root = treeData;
        root.x0 = viewerHeight / 2;
        root.y0 = 0;

        // Layout the tree initially and center on the root node.
        update(root);
        centerNode(root);

        svgOnMouseDown_dotNode();

        //na primeira vez que carrega
        if (firstLoad) {
            firstLoad = false;

            //setado o valor da var initialDiagram como o diagrama inicial
            //isso poderia ser feito lendo o arquivo 1_cladogram.json
            initialDiagram = JSON.parse(turnDiagramInText(root));
            initialDiagram = prepareDiagram(initialDiagram);

            //var initialNodes eh setado como um array alfanumerico que cada posicao recebe um Node
            initialNodes = getNodes(root, new Array());

            //var indexInitialNodes eh setado como um array numerico que cada posicao contem um index de initialNodes
            indexInitialNodes = getIndexNodes(root, new Array());
        }

        function attDiagram(){
          saveNewRoot(root, initialDiagram, cladogram, false);

          update(root);
          centerNode(modifiedFilo);

          svgOnMouseDown_dotNode();

          
        }

        function fAddFilo(filo_name, filo_category){
            var str_datetime = datetime();

            actions[0].push([
                modifiedFilo.name,
                modifiedFilo.category,
                filo_name,
                filo_category,
                str_datetime
            ]);

            modifiedFilo = addFilo(filo_name, filo_category, user_logged, modifiedFilo);

            attDiagram();
        }

        function fEditFilo(filo_name, filo_category){
            var str_datetime = datetime();

            actions[1].push([
                modifiedFilo.name, 
                modifiedFilo.category, 
                filo_name, 
                filo_category, 
                modifiedFilo.creator,
                str_datetime
            ]);

            modifiedFilo.name = filo_name;
            modifiedFilo.category = filo_category;
            modifiedFilo.editor = user_logged;

            attDiagram();
        }

        function placeholderAndTitleOfPOPUP(typeOfAction){
            if(typeOfAction == 0){
                title = "Adicionar táxon";
            } else if(typeOfAction == 1){
                title = "Editar táxon";
            }
            
            $("#createOrEdit_title")[0].innerText = title;
        }

        $(function(){
          $("body").on("mousedown", function(buttonPressed){
            if(buttonPressed.target.className.animVal == "overlay"){
              $("#div_tabOptions").css("display", "none");
              inputText_onfocusout($("#input_text").val());

            } else if(buttonPressed.target.className == "btn"){
              $("#div_tabOptions").css("display", "none");

            }

          });

          $("svg").on("mouseup", ".node", function(buttonPressed){
              dotNode_onmouseup(buttonPressed, $(this), user_logged, root.clado_creator);
              
              colorModifiedFilo = $(this)[0].children[0].attributes[2].nodeValue;
              modifiedFilo = $(this)[0].__data__;

          });

          $("#saveDiagram").on("click", function(){
            saveDiagram(root, actions, user_logged, clado_id);
            actions = [[], [] ,[], []];
            filos_notSaved = [];
            first_filosNotSaved = false;

          });

          $("#popup_shadow").on("click", function(){
            $(".popup").css({"display": "none"});

          });

          $("#li_addFilo").on("click", function(){
            $("#small_popup")[0].innerText = "";
            $("#form_addOrEditFilo").removeAttr("style");
            $("#div_informationFilo").css("display", "none");

            tabOptions_click = "#li_addFilo";

            $("#div_tabOptions").css("display", "none");
            $(".popup").css({"display": "block"});

            placeholderAndTitleOfPOPUP(0);

            $("input[name = filo_name]").focus();

            $("input[name = filo_name]").val("");
            $("input[name = filo_category]").val("");

          });

          $("#li_removeFilo").on("click", function(){
            var indexOfRemovedFilo = filos_notSaved.indexOf(modifiedFilo.name);
            if(indexOfRemovedFilo != -1){
                filos_notSaved.splice(indexOfRemovedFilo);

            }

            delete initialNodes[modifiedFilo.name];

            var str_datetime = datetime();

            actions[2].push([
                modifiedFilo.name, 
                modifiedFilo.category,
                modifiedFilo.creator,
                str_datetime
            ]);

            $("#div_tabOptions").css("display", "none");

            var father = modifiedFilo.parent.children;

            for(var i = 0; i < father.length; i++){
                if(father[i].name == modifiedFilo.name){
                    father.splice(i, 1);

                    break;
                }
                
            }

            modifiedFilo = modifiedFilo.parent;

            attDiagram();

          });

          $("#li_editFilo").on("click", function(){
            $("#small_popup")[0].innerText = "";
            $("#form_addOrEditFilo").removeAttr("style");
            $("#div_informationFilo").css("display", "none");

            tabOptions_click = "#li_editFilo";

            $("#div_tabOptions").css("display", "none");
            $(".popup").css({"display": "block"});

            placeholderAndTitleOfPOPUP(1);

            $("input[name = filo_name]").focus();

            $("input[name = filo_name]").val(modifiedFilo.name);
            $("input[name = filo_category]").val(modifiedFilo.category);

          });

          $("#li_infoFilo").on("click", function(){
            $("#div_tabOptions").css("display", "none");
            $(".popup").css({"display": "block"});
            
            $("#createOrEdit_title")[0].innerText = "Informações do filo";

            $("#form_addOrEditFilo").css("display", "none");
            $("#div_informationFilo").removeAttr("style");

            $.post("php/searchUser.php", {"creator": modifiedFilo.creator, "editor": modifiedFilo.editor}, function(e){
                e = e.split(";");
                _creator = e[0];
                _editor = e[1];

                try{
                    $("#info_name")[0].innerHTML = "<span style='font-weight: 600;'>Nome científico: </span> "+modifiedFilo.name;
                    $("#info_category")[0].innerHTML = "<span style='font-weight: 600;'>Categoria: </span> "+modifiedFilo.category;
                    $("#info_create")[0].innerHTML = "<span style='font-weight: 600;'>Criado por: </span> "+_creator;
                    $("#info_edit")[0].innerHTML = "<span style='font-weight: 600;'>Editado por: </span> "+_editor;
                    $("#info_nSubFilo")[0].innerHTML = "<span style='font-weight: 600;'>Número de táxons descentendes: </span> "+modifiedFilo.children.length;
                    $("#info_ancestralFilo")[0].innerHTML = "<span style='font-weight: 600;'>Táxon ascendente: </span> "+modifiedFilo.parent.name;
    
                } catch(e){
                    $("#info_name")[0].innerHTML = "<span style='font-weight: 600;'>Nome científico: </span> "+modifiedFilo.name;
                    $("#info_category")[0].innerHTML = "<span style='font-weight: 600;'>Categoria: </span> "+modifiedFilo.category;
                    $("#info_create")[0].innerHTML = "<span style='font-weight: 600;'>Criado por: </span> "+_creator;
                    $("#info_edit")[0].innerHTML = "<span style='font-weight: 600;'>Editado por: </span> "+_editor;
                    $("#info_nSubFilo")[0].innerHTML = "<span style='font-weight: 600;'>Número de táxons descentendes: </span> 0";
                    $("#info_ancestralFilo")[0].innerHTML = "<span style='font-weight: 600;'>Táxon ascendente: </span> "+modifiedFilo.parent.name;
    
                }

            });

          });

          $("#createOrEdit_btn").on("click", function(){
            var filo_name = $("input[name = filo_name]").val();
                filo_category = $("input[name = filo_category]").val();
                filoName_isOnlyChar = filo_name.search(/[^a-z ]/i);
                filoCategory_isOnlyChar = filo_category.search(/[^a-z ]/i);

            if(filo_name != "" && filoName_isOnlyChar == -1 && 
                    filo_category != "" && filoCategory_isOnlyChar == -1){
              filo_name = filo_name.toLowerCase().split(" ");
              filo_category = filo_category.toLowerCase().split(" ");

              if(filo_name.length < 3 && filo_category.length < 3){
                for(var i = 0; i < filo_name.length; i++){
                    filo_name[i] = filo_name[i][0].toUpperCase() + filo_name[i].slice(1);
                }

                for(var i = 0; i < filo_category.length; i++){
                    filo_category[i] = filo_category[i][0].toUpperCase() + filo_category[i].slice(1);
                }

                if(filo_name.length == 1){
                    filo_name = filo_name[0];
                } else if(filo_name.length == 2){
                    filo_name = filo_name[0] + " " + filo_name[1];
                }

                if(filo_category.length == 1){
                    filo_category = filo_category[0];
                } else if(filo_category.length == 2){
                    filo_category = filo_category[0] + " " + filo_category[1];
                }

                if(initialNodes != undefined){
                    if(initialNodes[filo_name] != undefined && filos_notSaved.indexOf(filo_name)){
                        if(tabOptions_click != "#li_editFilo"){
                            $("#small_popup")[0].innerText = "Táxon já existente!";
                            
                        } else{
                            if(filo_name != modifiedFilo.name){
                                $("#small_popup")[0].innerText = "Táxon já existente!";

                            } else{
                                $(".popup").css({"display": "none"});
                            
                                fEditFilo(filo_name, filo_category);
                            }
                        }
                    } else{
                        if(filos_notSaved.indexOf(filo_name) != -1 && first_filosNotSaved){
                            $("#small_popup")[0].innerText = "Táxon já existente!";

                        } else{
                            $(".popup").css({"display": "none"});

                            if(colorModifiedFilo == "fill: lightsteelblue;"){
                                toggleChildren(modifiedFilo);
                            }
            
                            if(tabOptions_click == "#li_addFilo"){
                                fAddFilo(filo_name, filo_category);
            
                            } else if(tabOptions_click == "#li_editFilo"){
                                fEditFilo(filo_name, filo_category);
            
                            }
    
                            filos_notSaved.push(filo_name);
                        }

                        if(!first_filosNotSaved){
                            first_filosNotSaved = true;
                        }
                    }
                } else{
                    if(filos_notSaved.indexOf(filo_name) != -1){
                        $("#small_popup")[0].innerText = "Táxon já existente!";

                    } else{
                        $(".popup").css({"display": "none"});

                        if(colorModifiedFilo == "fill: lightsteelblue;"){
                            toggleChildren(modifiedFilo);
                        }
        
                        if(tabOptions_click == "#li_addFilo"){
                            fAddFilo(filo_name, filo_category);
        
                        } else if(tabOptions_click == "#li_editFilo"){
                            fEditFilo(filo_name, filo_category);
        
                        }

                        filos_notSaved.push(filo_name);
                    }
                }
                
              } else{
                $("#small_popup")[0].innerText = "Dados inválidos!";
              }
              
            } else if(filo_name == "" || filo_category == ""){
                $("#small_popup")[0].innerText = "Preencha todos os campos!";

            } else if(filoName_isOnlyChar != -1 || filoCategory_isOnlyChar != -1){
                $("#small_popup")[0].innerText = "Dados inválidos!";

            }

          });

          $("#input_text").on("keyup", function(keyPressed){
            inputText_onkeyup(keyPressed.keyCode, $(this).val());

          }).on("focusin", function(){
            inputText_onfocusin($(this).val());

          });

          $("#ul_autoComplete").on("click", function(liClicked){
            liClicked = liClicked.target.innerText;
            ulAutoComplete_onclick(liClicked);

            centerNode(initialNodes[liClicked]);

          });

          $("#input_button").on("click", function(){
            if(firstLiSearch != 0){
                centerNode(initialNodes[firstLiSearch]);
            }
          });

        });

        $(window).resize(function() {
            viewerWidth = window.innerWidth;
            viewerHeight = window.innerHeight;
            $(".overlay").attr("height", viewerHeight);
            $(".overlay").attr("width", viewerWidth);
            
            centerNode(root);
        });

    });
}
