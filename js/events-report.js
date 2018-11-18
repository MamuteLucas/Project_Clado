$(function(){
    $("#btn_searchReport").on("click", function(){
        var user_id = $("#actions_user")[0].value,
            type_actions = $("#actions_type")[0].value,
            dt_initial = $("#initial_date")[0].value,
            dt_final = $("#final_date")[0].value;

        var query = "WHERE",
            _aux = false;

        if(user_id != 0){
            query += " user_id = "+user_id;
            _aux = true;
        }

        if(type_actions != 0){
            if(_aux){
                query += " AND";
            }
    
            if(type_actions == 1){
                query += " actions_type = 'adicionou'";
    
            } else if(type_actions == 2){
                query += " actions_type = 'editou'";
    
            } else if(type_actions == 3){
                query += " actions_type = 'excluiu'";
    
            } else if(type_actions == 4){
                query += " actions_type = 'arrastou'";
    
            }
        }

        if(_aux){
            query += " AND";
        }

        query += " a.actions_datetime >= " + dt_initial + " AND a.actions_datetime <= " + dt_final;

        console.log(query);
    });
});