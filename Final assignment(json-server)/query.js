// 展示查询结果
function add_data(stdent) {
    let html = "<tr>";
    html += "<td>" + stdent.id + "</td>";
    html += "<td>" + stdent.name + "</td>";
    html += "<td>" + stdent.gender + "</td>";
    html += "<td>" + stdent.age + "</td>";
    html += "<td>" + stdent.TelNum + "</td>";
    html += "</tr>";
   // alert(html);
    $("#query_tr").append(html);
}

//按照学号查询
function queryById() {
    var val = $("#queryId").val();
    $("#query_tr").empty();   //清空上次查询结果
    axios.get('http://localhost:3000/student', {
        params: {
            id: val
        }
    })
        .then(function (response) {
            console.log(response);
            response.data.forEach((stdent) => {add_data(stdent)})
        })
        .catch(function (error) {
            console.log(error);
        });
}

//按照姓名查询
function queryByName() {
    var val = $("#queryName").val();
    $("#query_tr").empty();   //清空上次查询结果
    axios.get('http://localhost:3000/student', {
        params: {
            name: val
        }
    })
        .then(function (response) {
            console.log(response);
            response.data.forEach((stdent) => {add_data(stdent)})
        })
        .catch(function (error) {
            console.log(error);
        });
}

//按照年龄查询
function queryByAge() {
    var val = $("#queryAge").val();
    $("#query_tr").empty();   //清空上次查询结果
    axios.get('http://localhost:3000/student', {
        params: {
            age: val
        }
    })
        .then(function (response) {
            console.log(response);
            response.data.forEach((stdent) => {add_data(stdent)})
        })
        .catch(function (error) {
            console.log(error);
        });
}

//按照性别查询
function queryByGender() {
    var val = $("#queryGender").val();
    $("#query_tr").empty();    
    axios.get('http://localhost:3000/student', {
        params: {
            gender: val
        }
    })
        .then(function (response) {
            console.log(response);
            response.data.forEach((stdent) => {add_data(stdent)})
        })
        .catch(function (error) {
            console.log(error);
        });
}

//按照手机号查询
function queryByTelNum() {
    var val = $("#queryTelNum").val();
    $("#query_tr").empty();   //清空上次查询结果
    axios.get('http://localhost:3000/student', {
        params: {
            TelNum: val
        }
    })
        .then(function (response) {
            console.log(response);
            response.data.forEach((stdent) => {add_data(stdent)})
        })
        .catch(function (error) {
            console.log(error);
        });
}