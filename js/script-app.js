var savedRoot = null;

function saveNewRoot(notSavedRoot, initialDiagram){
  //a var savedRoot se torna uma copia do objeto notSavedRoot, na qual agora pode ser manipulado sem causar travamentos
  //pois nao se trata mais de uma referencia ao mesmo local da memoria
  savedRoot = JSON.parse(turnDiagramInText(notSavedRoot));

  savedRoot = prepareDiagram(savedRoot);

  //o diagrama inicial eh comparado com o diagrama salvo para decidir de ira mostrar ou tirar o botao Salvar
  if(savedRoot != initialDiagram){
    animate();
  } else{
    depress();
  }
}

//funcao prepara o diagrama para ser salvo
function prepareDiagram(diagram){
  //aqui sao deletas as chaves da primeira camada do diagrama
  delete diagram.x;
  delete diagram.x0;
  delete diagram.y;
  delete diagram.y0;
  delete diagram.depth;
  delete diagram.id;
  //e aqui as posteriores
  delUnwatedKeysDiagram(diagram);

  //var savedRoot recebe o valor da var manipulableDiagram retornada pela funcao turnDiagramInText()
  diagram = turnDiagramInText(diagram);

  return diagram;
}

//funcao que 'salva' o novo diagrama
function saveDiagram(){
  //a linha abaixo envia (assincronamente) os dados que devem ser escritos no arquivo .json para o script PHP
  $.post("php/writeNewDiagram.php", {modifiedDiagram: savedRoot});

  //var initialDiagram recebe o valor do novo diagrama
  initialDiagram = savedRoot;
  
  depress();
}

//funcao deleta as chaves nao desejadas do diagrama
function delUnwatedKeysDiagram(diagram){
  if(diagram["children"] != null){
    diagram = diagram["children"];
    for(var i = 0; i < diagram.length; i++){
        delete diagram[i].x;
        delete diagram[i].x0;
        delete diagram[i].y;
        delete diagram[i].y0;
        delete diagram[i].depth;
        delete diagram[i].id;
    }

    for(var i = 0; i < diagram.length; i++){
      delUnwatedKeysDiagram(diagram[i]);
    }
  }
}

//funcao tranforma o objeto diagrama em texto
function turnDiagramInText(diagram){
  var cache = [];
  var manipulableDiagram = JSON.stringify(diagram, function(key, value){
    if(typeof value === 'object' && value !== null){
      if(cache.indexOf(value) !== -1){
        //Duplicate reference found
        try{
          //If this value does not reference a parent it can be deduped
          return JSON.parse(JSON.stringify(value));
        } catch(error){
          //discard key if value cannot be deduped
          return;
        }
      }
      //Store value in our collection
      cache.push(value);
    }
    return value;
  });

  cache = null; //Enable garbage collection

  return manipulableDiagram;
}

//funcao que adiciona a classe anime-start
function animate(){
  $('.anime').addClass('anime-start');
}

//funcao que remove a classe anime-start
function depress(){
  $('.anime-start').removeClass('anime-start');
}

$(function(){
    $.contextMenu({
        selector: '.node',
        items: {
            // <input type="text">
            name: {
                name: "Text",
                type: 'text',
                value: "Hello World",
                events: {
                    keyup: function(e) {
                        // add some fancy key handling here?
                        window.console && console.log('key: '+ e.keyCode);
                    }
                }
            },
            sep1: "---------",
            // <input type="checkbox">
            yesno: {
                name: "Boolean",
                type: 'checkbox',
                selected: true
            },
            sep2: "---------",
            // <input type="radio">
            radio1: {
                name: "Radio1",
                type: 'radio',
                radio: 'radio',
                value: '1'
            },
            radio2: {
                name: "Radio2",
                type: 'radio',
                radio: 'radio',
                value: '2',
                selected: true
            },
            radio3: {
                name: "Radio3",
                type: 'radio',
                radio: 'radio',
                value: '3'
            },
            radio4: {
                name: "Radio3",
                type: 'radio',
                radio: 'radio',
                value: '4',
                disabled: true
            },
            sep3: "---------",
            // <select>
            select: {
                name: "Select",
                type: 'select',
                options: {1: 'one', 2: 'two', 3: 'three'},
                selected: 2
            },
            // <textarea>
            area1: {
                name: "Textarea with height",
                type: 'textarea',
                value: "Hello World",
                height: 40
            },
            area2: {
                name: "Textarea",
                type: 'textarea',
                value: "Hello World"
            },
            sep4: "---------",
            key: {
                name: "Something Clickable",
                callback: $.noop
            }
        },
        events: {
            show: function(opt) {
                // this is the trigger element
                var $this = this;
                // import states from data store
                $.contextMenu.setInputValues(opt, $this.data());
                // this basically fills the input commands from an object
                // like {name: "foo", yesno: true, radio: "3", &hellip;}
            },
            hide: function(opt) {
                // this is the trigger element
                var $this = this;
                // export states to data store
                $.contextMenu.getInputValues(opt, $this.data());
                // this basically dumps the input commands' values to an object
                // like {name: "foo", yesno: true, radio: "3", &hellip;}
            }
        }
    });
});
