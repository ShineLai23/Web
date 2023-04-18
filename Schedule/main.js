$(function(){
    $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");

    let millisecondsPerDay = 24 * 60 * 60 * 1000;
    
    function create_table(){
        // 產生 table
        $("#courseTable tr").remove();
        
        var topicCount = topic.length;
        $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");
        for(var x = 0; x < topicCount; x++){
            $("#courseTable").append(
                `<tr id=row-${x}>` + 
                `<td>${x + 1}</td>` +
                `<td>${(new Date(startDate.getTime() + 7 * x * millisecondsPerDay)).toLocaleDateString('zh-tw', { month:'2-digit',day:'2-digit'})}</td>` + 
                `<td>${topic[x]}</td>` +
                `</tr>`
            );
        }
    }

    $("input[name='dateSubmit']").on("click", function(){
        let userDate = $("input[name='userStartDate']").val().split("-");

        setMonthAndDay(userDate[1], userDate[2]);
        create_table();
    });

    $("input[name='courseSubmit']").on("click", function(){
        let newCourseName = $("input[name='newCourse']").val();
        topic.push(newCourseName);
        create_table();
    })
});