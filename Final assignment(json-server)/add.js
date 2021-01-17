/**
 * 判断字符串是否为空
 * 参考https://blog.csdn.net/u014505759/article/details/80825879
 * @param {*} obj 
 */
function isEmpty(obj) {
    if (typeof obj === 'undefined' || obj == null || obj === '') {
      return true;
    } else {
      return false;
    }
}

/**
 * 添加数据
 * jquery.ajax() 实现
 */
function add() {
    // 从DOM树中获取信息
    var id=$("#id").val();
    var name=$("#name").val();
    var age=$("#age").val();
    var gender=$("input[name='ge']:checked").val();
    var TelNum = $("#TelNum").val();
    //console.log(id,name,age,gender,TelNum);

    if(isEmpty(id) || isEmpty(name) || isEmpty(age) || isEmpty(gender) || isEmpty(TelNum)) {
        alert("请填写完整信息!");
    }else {
        var newData = {    //定义新数据， json形式
            "id": id,
            "name": name,
            "age": age,
            "gender": gender,
            "TelNum": TelNum
        };
        $.ajax({   
            url: "http://localhost:3000/student",
            type: "POST",
            dataType: "json",
            data: newData,
            success: function(data) {
                alert("数据添加成功!");
            },
            error: function () {
                alert("数据添加失败!");
            }
        })   
    }   
}