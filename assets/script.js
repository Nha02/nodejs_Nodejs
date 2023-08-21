function takeData() {
  var phone = document.getElementById('phone').value;
  var email = document.getElementById('email').value;
  var city = document.getElementById('city').value;
  var district = document.getElementById('district').value;
  
  // validate phone
  var regexphone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  if (phone.replaceAll(" ", "") !== '') {
    if (regexphone.test(phone) == false) {
      alert('Số điện thoại của bạn không đúng định dạng!'); event.preventDefault(); return;
    }
  } else {
    alert('Bạn chưa điền số điện thoại!');
    event.preventDefault();
    // return;
  }
  // validate email
  var regexmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (email.replaceAll(" ", "") !== '') {
    if (regexmail.test(email) == false) {
      alert('Mail của bạn không đúng định dạng!');
      event.preventDefault();
      return;
    }
  } else {
    alert('Bạn chưa điền Mail!');
    event.preventDefault();
    return;
  }
  if (city == ''){
    alert(' Vui lòng nhập Tỉnh/Thành Phố');
    event.preventDefault();
    return;
  }
 // GetIPA citis,district
  var data = '';
  data += '<div>Phone : ' + phone + '</div>';
  data += '<div>Email : ' + email + '</div>';
//lọc trong object
 const cityName = dataList.find(n => n.Id == city);
 //lấy ra tên tỉnh
  data += '<div>City : ' + cityName.Name + '</div>';
 const districtName = cityName.Districts.find(n => n.Id == district);
  data += '<div>District : ' + districtName.Name + '</div>';
  document.getElementById('show').innerHTML = data;

  event.preventDefault();
}
var dataList = [];
//lấy ra thẻ
var citis = document.getElementById("city");
var districts = document.getElementById("district");
var Parameter = {
  url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
  method: "GET",
  responseType: "application/json",
};
// truy vấn data url
var promise = axios(Parameter);
promise.then(function (result) {
  dataList = result.data;
});
citis.onclick = function () {
  for (const x of dataList) {
    // gọi đến hàm của data list
    // gán data của từng tỉnh tp vào citis.op
    // khởi tạo object
    citis.options[citis.options.length] = new Option(x.Name, x.Id);
  }
  // lọc ra id thỏa mãn // lấy value dữ liệu thằng đầu tiên
  const result = dataList.find(n => n.Id === citis.options[0].value);
  for (const k of result.Districts) {
    // đẩy dữ liệu vào district
    district.options[district.options.length] = new Option(k.Name, k.Id);
  }
  //reset lại dữ liệu chọn
  district.length = 0;
  if (this.value != "") {
    // chọn lại bộ chọn theo tt mình đã lấy
    // if tỉnh có dữ liệu =>> find lại dữ liệu vào. this chọn lại bộ chọn
    const result = dataList.filter(n => n.Id === this.value);

    for (const k of result[0].Districts) {
      district.options[district.options.length] = new Option(k.Name, k.Id);
    }
  }
}

citis.onchange = function () {
  // khi thay đổi value
  // lấy dữ liệu của tỉnh trong data
  const result = dataList.find(n => n.Id === citis.options[0].value);
  for (const k of result.Districts) {
    district.options[district.options.length] = new Option(k.Name, k.Id);
  }
  district.length = 0;
  if (this.value != "") {

    const result = dataList.find(n => n.Id === this.value);
    for (const k of result[0].Districts) {
      district.options[district.options.length] = new Option(k.Name, k.Id);
    }
  }
}

