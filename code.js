$(document).ready(function () {
    // Xử lý sự kiện khi người dùng chọn file
    $("#fileInput").on("change", function () {
        // Đây là phần chọn ảnh thì:
        var fileInput = document.getElementById('fileInput');
        var file_dc_chon = fileInput.files[0];

        //1. Check xem nó có là ảnh không!
        //2. Nếu là ảnh thì review lên cho ae xem!
        if (is_picture(file_dc_chon)) {
            review_img_select(fileInput); 
        } else {
            alert("Bạn chọn file không phải ảnh!");
        }

    });

    $("#uploadButton").click(function(){
        //Đây là hành động upload ảnh lên sever:
        let fileInput = document.getElementById('fileInput');
        let file_dc_chon = fileInput.files[0];
        // Kiểm tra xem có file nào được chọn không
        if (file_dc_chon) {
            // Tạo đối tượng FormData để đóng gói dữ liệu form
            let formData = new FormData();
            formData.append('file', file_dc_chon);
            // Gửi AJAX request
            $.ajax({
                url: '/up.aspx', // Đường dẫn đến server xử lý upload
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function (response) {
                    // Xử lý kết quả từ máy chủ
                    alert(response);
                },
                error: function (error) {
                    // Xử lý lỗi nếu có
                    alert(error);
                }
            });
        } else {
            alert("Chưa file ảnh nào đc chọn nha!");
        }
    });


});

function review_img_select(input) {
    // truyền vào cái input có type là : type="file" thì khi nào nó change check nó là ảnh thì review!
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        // id vùng chứa ảnh <img id="vung_anh" src="#" alt="your image" />
        reader.onload = function (e) {
            $('#vung_anh').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}


function is_picture(file) {
    if (file) {
        // Kiểm tra phần mở rộng của tệp tin
        var fileName = file.name;
        var fileExtension = fileName.split('.').pop().toLowerCase();

        // Mảng các phần mở rộng của file ảnh
        var imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];

        // Kiểm tra xem phần mở rộng có thuộc danh sách các phần mở rộng của file ảnh không
        if (imageExtensions.indexOf(fileExtension) !== -1) {
            // File là file ảnh
            return true;
        }
        else {
            // File không phải là file ảnh
            return false;
        }
    }
    else {
        // chưa chọn file
        return false;
    }
}