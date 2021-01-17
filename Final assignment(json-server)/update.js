function update() {
    var id = $("#updateId").val();
    var name = $("#updatename").val();
    var age = $("#updateage").val();
    var gender = $("input[name='updatege']:checked").val();
    var TelNum = $("#updateTelNum").val();
    axios.put('http://localhost:3000/student/' + id, {
        "id": id,
        "name": name,
        "gender": gender,
        "age": age,
        "TelNum": TelNum
    })
        .then(function (response) {
            alert("更新成功！");
        })
        .catch(function (error) {
            alert(error);
        });
}

function getbyId() {
    var id = $("#updateId").val();
    axios.get('http://localhost:3000/student/' + id)
        .then(function (response) {
            $("#updateId").val(response.data.id);
            $("#updatename").val(response.data.name);
            $("#updateage").val(response.data.age);
            if (response.data.gender == "male") {
                $("#genderMale").prop("checked", true);
                $("#genderFemale").prop("checked", false);
            } else {
                $("#genderFemale").prop("checked", true);
                $("#genderMale").prop("checked", false);
            }
            $("#updateTelNum").val(response.data.TelNum);
        })
        .catch(function (error) {
            alert(error);
        });
}