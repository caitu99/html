/**
 * Created by chenhl on 2016/3/22.
 */

//账户信息表
function post_accounts_info(){
    // check login
    var token = $.cookie("caitu99_cookie");
    if (token == null) {
        $("#login_modal").modal("show");
    }
    //change params
    if( 1 != active ){
        active_url = apiurl + "/backstage.userinfo/1.0/getaccountsinfo";
        active = 1;  //1 账户信息表 2手机信息表 3启动记录表 4位置信息表 5财币入分记录表 6财币出分记录表 7财币总量变更记录表 8积分管理账户记录表
    }
    var reg = new RegExp("^[0-9]*$");
    var userId = parseInt(input_uid.value);
    if(!reg.test(userId)){
        alert("请输入正确的用户ID!");
        return;
    }

    $.post(active_url, {access_token: token, userId:userId}, function (result) {
        if(result.code == 0){
            $("#t_head").html("<tr><th>UID</th><th>手机号</th><th>QQ号</th><th>微博号</th><th>openid</th><th>微信昵称</th></tr>");
            $("#t_body").html( ergodic_accounts_info_data(result.data) );
        }else{
            tofail(result);
        }
    });
}

function ergodic_accounts_info_data(data){
    var result = "";
    result = result + "<tr>";
    result = result + "<td>" +  myfun(data.id) + "</td>";
    result = result + "<td>" +  myfun(data.mobile) + "</td>";
    result = result + "<td>" +  myfun(data.qq) + "</td>";
    result = result + "<td>" +  myfun(data.weibo) + "</td>";
    result = result + "<td>" +  myfun(data.openid) + "</td>";
    result = result + "<td>" +  myfun(data.wechatNick) + "</td>";
    result = result + "</tr>";
    return result;
}

//手机信息
function post_phone_info(){
    // check login
    var token = $.cookie("caitu99_cookie");
    if (token == null) {
        $("#login_modal").modal("show");
    }
    if( 2 != active ){
        active_url = apiurl + "/backstage.userinfo/1.0/getphoneinfo";
        active = 2;
    }

    //params
    var reg = new RegExp("^[0-9]*$");
    var userId = parseInt(input_uid.value);
    if(!reg.test(userId)){
        alert("请输入正确的用户ID!");
        return;
    }

    $.post(active_url, {access_token: token, userId:userId}, function (result) {
        if(result.code == 0){
            $("#t_head").html("<tr><th>UID</th><th>时间</th><th>IMEI</th><th>型号</th></tr>");
            $("#t_body").html( ergodic_phone_info_data(result.data) );
        }else{
            tofail(result);
        }
    });
}

function ergodic_phone_info_data(data){
    var result = "";
    for(var o in data){
        result = result + "<tr>";
        result = result + "<td>" +  myfun(data[o].userId) + "</td>";
        result = result + "<td>" +  myfun(data[o].createTime) + "</td>";
        result = result + "<td>" +  myfun(data[o].imei) + "</td>";
        result = result + "<td>" +  myfun(data[o].model) + "</td>";
        result = result + "</tr>";
    }
    return result;
}

//启动记录表
function post_alive_info(){
    // check login
    var token = $.cookie("caitu99_cookie");
    if (token == null) {
        $("#login_modal").modal("show");
    }
    if( 3 != active ){
        active_url = apiurl + "/backstage.userinfo/1.0/getaliveinfo";
        active = 3;
    }

    //params
    var reg = new RegExp("^[0-9]*$");
    var userId = parseInt(input_uid.value);
    if(!reg.test(userId)){
        alert("请输入正确的用户ID!");
        return;
    }
    var startDate = input_start_time.value;
    var endDate = input_end_time.value;
    if( startDate == '' || startDate == undefined || endDate == '' || endDate == undefined ){
        alert("请选择时间");
        return;
    }
    startDate = startDate + " 00:00:00";
    endDate = endDate + " 23:59:59";


    $.post(active_url, {access_token: token, userId:userId, startDate:startDate, endDate:endDate}, function (result) {
        if(result.code == 0){
            $("#t_head").html("<tr><th>UID</th><th>启动时间</th><th>关闭时间</th></tr>");
            $("#t_body").html( ergodic_alive_info_data(result.data) );
        }else{
            tofail(result);
        }
    });

}

function ergodic_alive_info_data(data){
    var result = "";
    for(var o in data){
        result = result + "<tr>";
        result = result + "<td>" +  myfun(data[o].userId) + "</td>";
        result = result + "<td>" +  myfun(data[o].startupTime) + "</td>";
        result = result + "<td>" +  myfun(data[o].shutdownTime) + "</td>";
        result = result + "</tr>";
    }
    return result;
}

//位置信息记录表
function post_ipgps_info(){
    // check login
    var token = $.cookie("caitu99_cookie");
    if (token == null) {
        $("#login_modal").modal("show");
    }
    if( 4 != active ){
        active_url = apiurl + "/backstage.userinfo/1.0/getipgpsinfo";
        active = 4;
    }

    //params
    var reg = new RegExp("^[0-9]*$");
    var userId = parseInt(input_uid.value);
    if(!reg.test(userId)){
        alert("请输入正确的用户ID!");
        return;
    }
    var startDate = input_start_time.value;
    var endDate = input_end_time.value;
    if( startDate == '' || startDate == undefined || endDate == '' || endDate == undefined ){
        alert("请选择时间");
        return;
    }
    startDate = startDate + " 00:00:00";
    endDate = endDate + " 23:59:59";

    $.post(active_url, {access_token: token, userId:userId, startDate:startDate, endDate:endDate}, function (result) {
        if(result.code == 0){
            $("#t_head").html("<tr><th>UID</th><th>记录时间</th><th>GPS地址</th><th>IP</th><th>IP地址</th><th>运营商</th><th>IMEI</th></tr>");
            $("#t_body").html( ergodic_ipgps_info_data(result.data) );
        }else{
            tofail(result);
        }
    });
}

function ergodic_ipgps_info_data(data){
    var result = "";
    for(var o in data){
        result = result + "<tr>";
        result = result + "<td>" +  myfun(data[o].uID) + "</td>";
        result = result + "<td>" +  myfun(data[o].time) + "</td>";
        result = result + "<td>" +  myfun(data[o].gPSAddress) + "</td>";
        result = result + "<td>" +  myfun(data[o].iP) + "</td>";
        result = result + "<td>" +  myfun(data[o].iPBelong) + "</td>";
        result = result + "<td>" +  myfun(data[o].isp) + "</td>";
        result = result + "<td>" +  myfun(data[o].iMEI) + "</td>";
        result = result + "</tr>";
    }
    return result;
}

//财币入分记录表
function post_in_integral_info(){
    // check login
    var token = $.cookie("caitu99_cookie");
    if (token == null) {
        $("#login_modal").modal("show");
    }
    if( 5 != active ){
        active_url = apiurl + "/backstage.userinfo/1.0/getinintegralinfo";
        active = 5;
    }

    //params
    var reg = new RegExp("^[0-9]*$");
    var userId = parseInt(input_uid.value);
    if(!reg.test(userId)){
        alert("请输入正确的用户ID!");
        return;
    }
    var startDate = input_start_time.value;
    var endDate = input_end_time.value;
    if( startDate == '' || startDate == undefined || endDate == '' || endDate == undefined ){
        alert("请选择时间");
        return;
    }
    startDate = startDate + " 00:00:00";
    endDate = endDate + " 23:59:59";

    $.post(active_url, {access_token: token, userId:userId, startTime:startDate, endTime:endDate}, function (result) {
        if(result.code == 0){
            $("#t_head").html("<tr><th>UID</th><th>记录时间</th><th>入分数量</th><th>来源</th><th>兑换比例</th><th>财币总量</th></tr>");
            $("#t_body").html( ergodic_in_integral_data(result.data) );
        }else{
            tofail(result);
        }
    });

}

function ergodic_in_integral_data(data){
    var result = "";
    for(var o in data){
        result = result + "<tr>";
        result = result + "<td>" +  myfun(data[o].uID) + "</td>";
        result = result + "<td>" +  myfun(data[o].time) + "</td>";
        result = result + "<td>" +  myfun(data[o].integral) + "</td>";
        result = result + "<td>" +  myfun(data[o].type) + "</td>";
        result = result + "<td>" +  myfun(data[o].ratio) + "</td>";
        result = result + "<td>" +  myfun(data[o].total) + "</td>";
        result = result + "</tr>";
    }
    return result;
}

//财币出分记录表
function post_out_integral_info(){
    // check login
    var token = $.cookie("caitu99_cookie");
    if (token == null) {
        $("#login_modal").modal("show");
    }
    if( 6 != active ){
        active_url = apiurl + "/backstage.userinfo/1.0/getoutintegralinfo";
        active = 6;
    }

    //params
    var reg = new RegExp("^[0-9]*$");
    var userId = parseInt(input_uid.value);
    if(!reg.test(userId)){
        alert("请输入正确的用户ID!");
        return;
    }
    var startDate = input_start_time.value;
    var endDate = input_end_time.value;
    if( startDate == '' || startDate == undefined || endDate == '' || endDate == undefined ){
        alert("请选择时间");
        return;
    }
    startDate = startDate + " 00:00:00";
    endDate = endDate + " 23:59:59";

    $.post(active_url, {access_token: token, userId:userId, startTime:startDate, endTime:endDate}, function (result) {
        if(result.code == 0){
            $("#t_head").html("<tr><th>UID</th><th>记录时间</th><th>出分数量</th><th>去向</th><th>财币总量</th></tr>");
            $("#t_body").html( ergodic_out_integral_data(result.data) );
        }else{
            tofail(result);
        }
    });
}

function  ergodic_out_integral_data(data){
    var result = "";
    for(var o in data){
        result = result + "<tr>";
        result = result + "<td>" +  myfun(data[o].uID) + "</td>";
        result = result + "<td>" +  myfun(data[o].time) + "</td>";
        result = result + "<td>" +  myfun(data[o].integral) + "</td>";
        result = result + "<td>" +  myfun(data[o].type) + "</td>";
        result = result + "<td>" +  myfun(data[o].total) + "</td>";
        result = result + "</tr>";
    }
    return result;
}

//财币总量变更记录表
function post_total_integralchange_info(){
    // check login
    var token = $.cookie("caitu99_cookie");
    if (token == null) {
        $("#login_modal").modal("show");
    }
    if( 7 != active ){
        active_url = apiurl + "/backstage.userinfo/1.0/gettotalintegralchangeinfo";
        active = 7;
    }

    //params
    var reg = new RegExp("^[0-9]*$");
    var userId = parseInt(input_uid.value);
    if(!reg.test(userId)){
        alert("请输入正确的用户ID!");
        return;
    }
    var startDate = input_start_time.value;
    var endDate = input_end_time.value;
    if( startDate == '' || startDate == undefined || endDate == '' || endDate == undefined ){
        alert("请选择时间");
        return;
    }
    startDate = startDate + " 00:00:00";
    endDate = endDate + " 23:59:59";

    $.post(active_url, {access_token: token, userId:userId, startTime:startDate, endTime:endDate}, function (result) {
        if(result.code == 0){
            $("#t_head").html("<tr><th>UID</th><th>记录时间</th><th>财币总量</th></tr>");
            $("#t_body").html( ergodic_total_integralchange_data(result.data) );
        }else{
            tofail(result);
        }
    });
}

function ergodic_total_integralchange_data(data){
    var result = "";
    for( var o in data){
        result = result + "<tr>";
        result = result + "<td>" +  myfun(data[o].uID) + "</td>";
        result = result + "<td>" +  myfun(data[o].changeTime) + "</td>";
        result = result + "<td>" +  myfun(data[o].totalIntegral) + "</td>";
        result = result + "</tr>";
    }
    return result;
}

//积分管理账户记录
function post_integral_account_info(){
    // check login
    var token = $.cookie("caitu99_cookie");
    if (token == null) {
        $("#login_modal").modal("show");
    }
    if( 8 != active ){
        active_url = apiurl + "/backstage.userinfo/1.0/getintegralaccountinfo";
        active = 8;
    }

    //params
    var reg = new RegExp("^[0-9]*$");
    var userId = parseInt(input_uid.value);
    if(!reg.test(userId)){
        alert("请输入正确的用户ID!");
        return;
    }
    var startDate = input_start_time.value;
    var endDate = input_end_time.value;
    if( startDate == '' || startDate == undefined || endDate == '' || endDate == undefined ){
        alert("请选择时间");
        return;
    }
    startDate = startDate + " 00:00:00";
    endDate = endDate + " 23:59:59";

    $.post(active_url, {access_token: token, userId:userId, startTime:startDate, endTime:endDate}, function (result) {
        if(result.code == 0){
            $("#t_head").html("<tr><th>UID</th><th>账户</th><th>所属平台</th></tr>");
            $("#t_body").html( ergodic_integral_account_data(result.data) );
        }else{
            tofail(result);
        }
    });
}

function ergodic_integral_account_data(data){
    var result = "";
    for( var o in data){
        result = result + "<tr>";
        result = result + "<td>" +  myfun(data[o].uID) + "</td>";
        result = result + "<td>" +  myfun(data[o].account) + "</td>";
        result = result + "<td>" +  myfun(data[o].belongTo) + "</td>";
        result = result + "</tr>";
    }
    return result;
}