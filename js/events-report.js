$(function(){
    $("#btn_searchReport").on("click", function(){
        var user_id = $("#actions_user")[0].value,
            type_actions = $("#actions_type")[0].value,
            dt_initial = $("#initial_date")[0].value,
            dt_final = $("#final_date")[0].value;

            dt_initial = dt_initial.split("T");
            dt_initial = dt_initial[0] + " " + dt_initial[1];

            dt_final = dt_final.split("T");
            dt_final = dt_final[0] + " " + dt_final[1];

        $.post("php/actionReport_search.php", {
            "user_id": user_id,
            "type_actions": type_actions,
            "dt_initial": dt_initial,
            "dt_final": dt_final
        }, function(returned){
            $("#table_report").html(returned);
        });

    });
});