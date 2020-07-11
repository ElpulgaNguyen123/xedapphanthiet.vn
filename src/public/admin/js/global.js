

$('.slider-delete a.delete_slider').on('click', function () {
    var urlDeleteSlider = $(this).attr('href');
    $('#delete_slider').attr('href', urlDeleteSlider);
});

// user actions
var userInfo = {};
var oringinUserInfo = {};
var userAvatar = null;

function updateUserInfo() {
    $('#profile-username').bind('change', function () {
        userInfo.userName = $(this).val();
    })
    $('#profile-email').bind('change', function () {
        userInfo.email = $(this).val();
    })
    $('#profile-phone').bind('change', function () {
        userInfo.phone = $(this).val();
    })
    $('#profile-address').bind('change', function () {
        userInfo.address = $(this).val();
    })
    $('#profile-gender-male').bind('click', function () {
        userInfo.gender = $(this).val();
    })
    $('#profile-gender-female').bind('click', function () {
        userInfo.gender = $(this).val();
    })
}

function getUserAvatarUpdate() {

    $('#input-change-avatar').bind('change', function () {

        let fileData = $(this)[0].files[0];
        let math = ["image/png", "image/jpg", "image/jpeg"];
        let limit = 1048576;  // 1 mb 
        // hàm inArray là dùng để check dữ liệu coi có trùng hay không.
        if ($.inArray(fileData.type, math) === -1) {
            alertify.notify('Kiểu ảnh không hợp lệ, chỉ chấp nhận kiểu jpg hoặc png', 'error', 7);
            $(this).val(null);
            return false;
        }
        if (fileData.size > limit) {
            console.log('Dung lượng ảnh quá lớn');
            $(this).val(null);
            return false;
        }
        // kiểm tra xem trình duyệt có hỗ trợ file reader hay không
        if (typeof (FileReader) != 'undefine') {
            var fileReader = new FileReader();
            // hình ảnh preview sau khi chọn file;
            var image_preview = $('#image-avatar-preview');
            var originImage = $('#image-avatar-info');
            fileReader.onload = function (element) {
                image_preview.attr('src', element.target.result);
                originImage.css('display', 'none');
            }

            var formData = new FormData(); // Currently empty
            formData.append('avatar', fileData);
            userAvatar = formData;
            console.log(userAvatar);
            // sau khi xong hết mọi thứ thì đưa vào fileReader để đọc.
            // Truyền `File` vào đối tượng `FileReader` và chỉ thị đọc ra dữ liệu dưới dạng `data URL`
            // Sau khi load thành công sẽ thực hiện đoạn code trong `onload` function phía trên
            fileReader.readAsDataURL(fileData);
        }
    })

    let images_src = $('#image-avatar-info').attr('src');
}
function userAvatarUpdate() {

    $.ajax({
        url: 'update-avatar/user',
        type: 'put',
        cache: false,
        contentType: false, // kiểu dữ liệu được đửa lên
        processData: false, // Set giá trị này là false nếu bạn không muốn dữ liệu được truyền vào thiết lập data sẽ được xử lý và biến thành một query kiểu chuỗi.
        data: userAvatar,
        success: function (result) {
            // cập nhật ngay lập tức avatar trên giao diện
            $('#image-avatar-info').attr('src', 'assets/images/auth/' + result.imageSrc);
            $('#main-menu-header-profile').attr('src', 'assets/images/auth/' + result.imageSrc);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

// update user info change
function userInfoUpdate() {
    $.ajax({
        url: 'update-user/user',
        type: 'put',
        data: userInfo,
        success: function (result) {
            // sao chép lại tất cả các cả thuộc tính update cho đối tượng gốc trên Frontend
            oringinUserInfo = Object.assign(oringinUserInfo, userInfo);
            $('#username-info').text(userInfo.userName);
            $('$user-image-profile').text(userInfo.userName);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

// ============================================================================================

// Products action
let productItem = {};
var productImage = null;

function getProductImageUpdate() {

    $('#product-change-avatar').bind('change', function () {
        let fileData = $(this)[0].files[0];
        let math = ["image/png", "image/jpg", "image/jpeg"];
        let limit = 1048576;  // 1 mb 

        // hàm inArray là dùng để chekc dữ liệu coi có trùng hay không.
        if ($.inArray(fileData.type, math) === -1) {
            alertify.notify('Kiểu ảnh không hợp lệ, chỉ chấp nhận kiểu jpg hoặc png', 'error', 7);
            $(this).val(null);
            return false;
        }

        if (fileData.size > limit) {
            console.log('Dung lượng ảnh quá lớn');
            $(this).val(null);
            return false;
        }
        // kiểm tra xem trình duyệt có hỗ trợ file reader hay không
        if (typeof (FileReader) != 'undefine') {

            var fileReader = new FileReader();
            // hình ảnh preview sau khi chọn file;
            var image_preview = $('#product-avatar-preview');
            var originImage = $('#product-avatar');

            fileReader.onload = function (element) {
                image_preview.attr('src', element.target.result);
                image_preview.css('display', 'block');
                originImage.css('display', 'none');
            }

            var formData = new FormData(); // Currently empty
            formData.append('product-image', fileData);
            var index_image = $('#product-avatar').attr('data-index');
            formData.append('index', index_image);
            productImage = formData;
            console.log(productImage);
            // sau khi xong hết mọi thứ thì đưa vào fileReader để đọc.
            // Truyền `File` vào đối tượng `FileReader` và chỉ thị đọc ra dữ liệu dưới dạng `data URL`
            // Sau khi load thành công sẽ thực hiện đoạn code trong `onload` function phía trên
            fileReader.readAsDataURL(fileData);
        }
    });

    let images_src = $('#image-avatar-info').attr('src');
}

// thực hiện update hình ảnh của sản phẩm
function postProductImageUpdate(id, srcItem) {

    var url = '/admin/product/edit_product_image/' + id;
    $.ajax({
        url: url,
        type: 'put',
        cache: false,
        contentType: false, // kiểu dữ liệu được đửa lên
        processData: false, // Set giá trị này là false nếu bạn không muốn dữ liệu được truyền vào thiết lập data sẽ được xử lý và biến thành một query kiểu chuỗi.
        data: productImage,
        success: function (result) {
            var urlImage = '/assets/images/products/' + result.imageSrc;
            srcItem.attr('src', urlImage);
            $('#product-image-change').modal('hide');
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function addProduct() {

    $('#product_name').bind('change', function () {
        productItem.name = $(this).val();
    })
    $('#product_price').bind('change', function () {
        productItem.price = $(this).val();
    });
    $('#product_count').bind('change', function () {
        productItem.count = $(this).val();
    });
}


if (document.querySelector(".template")) {
    var previewNode = document.querySelector(".template");
    previewNode.id = "";
    var previewTemplate = previewNode.parentNode.innerHTML;
    previewNode.parentNode.removeChild(previewNode);

    var myDropzone = new Dropzone(document.body, { // Make the whole body a dropzone
        url: "/admin/product/add-product-image", // Set the url
        method: 'POST',
        paramName: "product-images",
        maxFiles: 10,
        maxFilesize: 1024,
        uploadMultiple: true,
        thumbnailWidth: 80,
        thumbnailHeight: 80,
        parallelUploads: 20,
        previewTemplate: previewTemplate,
        autoQueue: false, // Make sure the files aren't queued until manually added
        previewsContainer: "#previews", // Define the container to display the previews
        clickable: ".fileinput-button" // Define the element that should be used as click trigger to select files.
    });

    myDropzone.on("addedfile", function (file) {
        // Hookup the start button
        file.previewElement.querySelector(".start").onclick = function () {
            myDropzone.enqueueFile(file);
        };
    });

    // Update the total progress bar
    myDropzone.on("totaluploadprogress", function (progress) {
        document.querySelector("#total-progress .progress-bar").style.width = progress + "%";
    });

    myDropzone.on("sending", function (file) {
        // Show the total progress bar when upload starts
        document.querySelector("#total-progress").style.opacity = "1";
        // And disable the start button
        file.previewElement.querySelector(".start").setAttribute("disabled", "disabled");
    });

    // Hide the total progress bar when nothing's uploading anymore
    myDropzone.on("queuecomplete", function (progress) {
        console.log('Khi tất cả các file đã được up lên')
        document.querySelector("#total-progress").style.opacity = "0";
    });

    // Setup the buttons for all transfers
    // The "add files" button doesn't need to be setup because the config
    // `clickable` has already been specified.
    document.querySelector("#actions .start").onclick = function () {
        myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED));
    };
    document.querySelector("#actions .cancel").onclick = function () {
        myDropzone.removeAllFiles(true);
    };
}




// Dropzone.options.myAwesomeDropzone = { // The camelized version of the ID of the form element
//     // The configuration we've talked about above
//     url: '/admin/addproduct',
//     method: 'POST',
//     paramName: "file",
//     previewTemplate: previewTemplate,
//     previewsContainer: "#previews", // Define the container to display the previews
//     autoProcessQueue: false,
//     parallelUploads: 10, // use it with uploadMultiple
//     uploadMultiple: true, // upload files in a single request
//     maxFiles: 10,
//     maxFilesize: 1024,
//     thumbnailHeight: 120,
//     thumbnailWidth: 120,
//     addRemoveLinks: true,
//     dictDefaultMessage: 'Click vào để chọn ảnh hoặc kéo thả ảnh',
//     dictResponseError: 'Lỗi Khi Upload file !',

//     renameFile: function (file) {
//         let newName = new Date().getTime() + '_' + file.name;
//         return newName;
//     },

//     // The setting up of the dropzone
//     init: function () {

//         //var formDataProduct = new FormData();
//         var myDropzone = this;
//         // đường dẫn riêng biệt cho từng url.
//         var urlOption = '';

//         myDropzone.on('click', function () {
//             console.log('click')
//         })

//         // lắng nghe mỗi khi thêm file mỗi khi click sự kiện.
//         this.on("addedfile", function (file) {
//             console.log('addedfile');
//             $('.start').on('click', function () {
//                 this.enqueueFile(file);
//             })
//         });

//         this.on("totaluploadprogress", function(progress) {
//             $('.progress-bar').style.width = progress + "%";
//           });

//         // sau khi upload xong thì set các giá trị về 0
//         this.on("complete", function (file) {
//             if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
//                 // doSomething();
//                 console.log('hoàn thành');
//             }
//         });

//         $('.btn-danger').on('click', function () {
//             console.log(myDropzone.files);
//         })

//         // thực hiện thêm hình ảnh
//         $('#dropzoneSubmit').on('click', function (e) {
//             myDropzone.processQueue();
//             var imgPathArrr = [];
//             console.log(myDropzone.files);
//             // if (myDropzone.files != "") {
//             //     for (var index = 0; index < myDropzone.files.length; index++) {
//             //         imgPathArrr.push(myDropzone.files[index].upload.filename);
//             //     }
//             //     // thiết lập dữ liệu cho input bên frontend để truyền lên server
//             //     $('#image_path').val(imgPathArrr);
//             //     $("#product_form").submit();

//             // } else {
//             //     console.log('File đã được Submit');
//             //     return false;
//             // }
//         });

//         // thực hiện update hoặc thêm hình ảnh.
//         $('#save-button-product-image').on('click', function (param) {

//             urlOption = $(this).attr('data-url');
//             var imgPathArrr = [];

//             if (myDropzone.files != "") {
//                 $("#image_path_form").append(
//                     "<input type='hidden' name='image_path' id='image_path'"
//                     + "class='form-control form-bg-inverse'"
//                     + "placeholder='Đường dẫn sản phẩm'>"
//                 );
//                 myDropzone.url = urlOption;
//                 myDropzone.processQueue();
//                 for (var index = 0; index < myDropzone.files.length; index++) {
//                     imgPathArrr.push(myDropzone.files[index].upload.filename);
//                 }
//                 $('#image_path').val(imgPathArrr);
//                 $("#product-edit-form").submit(function () {

//                 });
//             } else {

//                 $("#product-edit-form").submit();
//             }
//         })

//         this.on('success', function (file, response) {
//             console.log('Upload thành công rồi nek !');
//             console.log(response);
//         });

//         this.on("error", function (file, response) {
//             console.log('Lỗi');
//             console.log(response);
//         });
//         // Listen to the sendingmultiple event. In this case, it's the sendingmultiple event instead
//         // of the sending event because uploadMultiple is set to true.
//         myDropzone.on("sendingmultiple", function (files, shr, formData) {
//             // Gets triggered when the form is actually being sent.
//             // Hide the success button or the complete form.
//         });
//         // thực hiện upload thêm hình cho sản phẩm
//         myDropzone.on('processingmultiple', function (files) {
//             //this.options.url = "/some-other-url";
//         })
//         myDropzone.on("successmultiple", function (files, response) {
//             console.log('Upload thành công')
//             // Gets triggered when the files have successfully been sent.
//             // Redirect user or notify of success.
//         });
//         myDropzone.on("errormultiple", function (files, response) {
//             console.log('Upload lỗi')
//             console.log(response);
//             // Gets triggered when there was an error sending the files.
//             // Maybe show form again, and notify user of error
//         });

//     }

// }

//Dropzone.autoDiscover = false;


$(document).ready(function () {


    // PRODUCT ADD FORM SUBMIT;
    $('#dropzoneSubmit').on('click', function () {
        $('#product_form').submit();
    })

    // user Action start
    // ==========================================

    // gọi hàm userinfo lấy dữ liệu
    getUserAvatarUpdate();
    updateUserInfo();

    oringinUserInfo = {
        userName: $('#profile-username').val(),
        email: $('#profile-email').val(),
        gender: ($('#input-change-gender-male').is(":checked") ? $('#input-change-gender-male').val() : $('#input-change-gender-female').val()),
        address: $('#profile-address').val(),
        phone: $('#profile-phone').val()
    }

    $('#checkinfo-change').bind('click', function () {
        if ($.isEmptyObject(userInfo) && !userAvatar) {
            alert('Không có sự thay đổi nào.');
        }
        // upload data change to backend
        userInfoUpdate();
        userAvatarUpdate();
        // upload data to server        console.log(userInfo);
    })

    // user Action END
    // ==========================================


    // product Action START
    // ==========================================

    addProduct();
    getProductImageUpdate();

    // khai báo thứ tự hình ảnh để upload
    var id_image = '',
        img_item_afterload = null;
    // thực hiện click và lấy đường dẫn URL lên cho hình ảnh modal
    $('.edit-product-image').bind('click', function () {
        var image_show = $('#product-avatar');
        var index_image = $(this).parent().parent().prev().attr('data-index');
        id_image = $(this).parent().parent().prev().attr('data-id');
        var src_img = $(this).parent().parent().prev().attr('src');
        img_item_afterload = $(this).parent().parent().prev();
        image_show.attr('src', src_img);
        image_show.attr('data-index', index_image);
    });

    // thực hiện gửi data lên server và back lại cho client
    $('#save-button-product-image-modal').on('click', function () {
        postProductImageUpdate(id_image, img_item_afterload);
    });

    // thực hiện gán sự kiện lấy file cho hình ảnh thay đổi avatar
    $("#click-change-icons").click(function () {
        $("#product-change-avatar").trigger('click');
    });

    $('.show-image-add').on('click', function () {
        $('.dropzone-edit-more').toggleClass('show');
    })

    // Product backend
    // summernote editor
    $('#summernote').summernote({
        placeholder: 'Hello bootstrap 4',
        tabsize: 2,
        height: 300
    });
    // product action end 
    // =============================================================

    var price = $('.product-price').text();
    var string = numeral(parseInt(price)).format('0,0');
    $('.product-price').text(string);
    // Get the template HTML and remove it from the doumenthe template HTML and remove it from the doument


    /*=============================================
    =            Tags input auto complete           =
    =============================================*/



    /*=====  Tags Input auto complete ======*/


})





