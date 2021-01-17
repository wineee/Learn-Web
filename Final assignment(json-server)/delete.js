function directDelete(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:3000/student/"+id,
        dataType: "json",
        success:function(data) {
            alert("删除成功！");
        },
        error: function(data) {
            alert("删除失败！");
        }
    })
}

function Delete() {
    // 获取要删除信息的学号
    var id=$("#deleteId").val();
    //alert("删除信息的学号是："+id);   
    $.ajax({
        // 先查询有没有这条信息
        type: "GET",
        url: "http://localhost:3000/student/"+id,
        dataType: "json",
        success: function(e) {
            console.log(e);
            document.getElementById('idTd').innerHTML = e.id;
            document.getElementById('nameTd').innerHTML = e.name;
            document.getElementById('genderTd').innerHTML = e.gender;
            document.getElementById('ageTd').innerHTML = e.age;
            document.getElementById('TelNumTd').innerHTML = e.TelNum;
            directDelete(id);
        },
        error: function(e) {
            alert("不存在该数据!");
        }
    })
}
