var fname = document.getElementById('name')
var phone = document.getElementById('phone');
var address = document.getElementById('address'); 
var note = document.getElementById('note');
 
var foodmain, foodextra, msg, costValue; //lan luot la danh sach mon chinh, danh sach mon phu, noi dung, gia tien
var fextrachk = []; // mang danh sach mon phu duoc chon
foodextra = '';
costValue = 0;
var cost = document.getElementById('cost');

// lay form 
var form = document.getElementById('info');

 // lay danh sach mon chinh va mon phu
var listFmain = document.querySelectorAll('input[name="foodmain"]');
var listFextra = document.querySelectorAll('input[name="extra"]');

    // duyet danh sach mon chinh
    for(var i = 0; i < listFmain.length; i++) {
        listFmain[i].addEventListener("change", function(event) {
            foodmain = event.target.value;

            if(costValue == 0) // dieu kien chon it nhat 1 mon chinh
                costValue += 25000;
            cost.innerHTML = costValue;
      }, false);
    };

    //duyet danh sach mon phu
    for(var i = 0; i < listFextra.length; i++) {
        listFextra[i].addEventListener("change", function(event) {
            fextrachk = Array.from(listFextra)// Chuyen tu listExtra sang mang 
            .filter(i => i.checked) // Su dung .filter de xoa nhung checkbox khong duoc check
            .map(i => i.value) // Su dung .map de lay gia tri
            if(this.checked){
                costValue += 5000;
            }
            else{
                costValue -= 5000;
            }    
            cost.innerHTML = costValue;
      }, false);
    };


// xu ly su kien submit
form.addEventListener('submit', function(event){
    event.preventDefault();    
    var fnameValue = fname.value;
    var phoneValue = phone.value;
    var addressValue = address.value;

    // bat loi bo trong (55 - 74)
    if(fnameValue == ''){
        errorMessage(fname, "Họ và tên không được bỏ trống.");
    }else{
        successMessage(fname);
    }
    if(phoneValue == ''){
        errorMessage(phone, "Số điện thoại không được bỏ trống.");
    }else{
        successMessage(phone);
    }
    if(addressValue == ''){
        errorMessage(address, "Địa chỉ không được bỏ trống.");
    }else{
        successMessage(address);
    }
    if(costValue < 25000){
        errorMessage(cost, "Chọn ít nhất một món chính.");
    }else{
        successMessage(cost);
    }

    if (fname.parentElement.classList.contains('success') &&  phone.parentElement.classList.contains('success') 
        && address.parentElement.classList.contains('success') && cost.parentElement.classList.contains('success') ) {
        
        msg = '<h2>Đặt hàng thành công</h2>' + '<div class = "ordered"><p><b>Họ tên: </b>' + fnameValue + '</p>';
        msg += '<p><b>Số điện thoại: </b>' + phoneValue + '</p>';
        msg += '<p><b>Địa chỉ: </b>' + addressValue + '</p>';
        msg += '<p><b>Ghi chú: </b>' + note.value + '</p>';
        msg += '<p><b>Món chính:</b> </p>' + foodmain ;
        msg += '<p><b>Món phụ:</b> </p>' + fextrachk ;
        msg += '<p><b>Thành tiền:</b> </p>' + costValue  + '</div>';
        msg += '<div id = "thanks">Cảm ơn bạn đã lựa chọn chúng tôi !</div>'
        form.innerHTML = msg; // noi dung trong form thanh msg
    }


}, false)

//ham them vao class error
function errorMessage(pElement, pMessage) {
    const formControl = pElement.parentElement;
    if (formControl.classList.contains('success')) {
        formControl.classList.remove('success');
        formControl.classList.add('error');
    } else {
        formControl.classList.add('error');
    }
    formControl.querySelector('.message').textContent = pMessage;
}

// ham them vao class success
function successMessage(pElement) {
    const formControl = pElement.parentElement;
    if (formControl.classList.contains('error')) {
        formControl.classList.remove('error');
        formControl.classList.add('success');
    } else {
        formControl.classList.add('success');
    }
}

