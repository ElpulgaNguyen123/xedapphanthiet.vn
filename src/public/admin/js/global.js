

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
        userInfo.name = $(this).val();
    })
    $('#profile-email').bind('change', function () {
        userInfo.email = $(this).val(); image_path
    })
    $('#profile-phone').bind('change', function () {
        userInfo.phone = $(this).val();
    })
    $('#profile-address').bind('change', function () {
        userInfo.address = $(this).val();
    })
}

function notify(message, type) {
    $.growl({
        message: message
    }, {
        type: type,
        allow_dismiss: false,
        label: 'Cancel',
        className: 'btn-xs btn-inverse',
        placement: {
            from: 'bottom',
            align: 'right'
        },
        delay: 2500,
        animate: {
            enter: 'animated fadeInRight',
            exit: 'animated fadeOutRight'
        },
        offset: {
            x: 30,
            y: 30
        }
    });
};
function getUserAvatarUpdate() {

    $('#input-change-avatar').bind('change', function () {
        let fileData = $(this)[0].files[0];
        let math = ["image/png", "image/jpg", "image/jpeg"];
        let limit = 1048576;  // 1 mb 
        // hàm inArray là dùng để check dữ liệu coi có trùng hay không.
        if ($.inArray(fileData.type, math) === -1) {
            notify('Kiểu ảnh không hợp lệ, chỉ chấp nhận kiểu jpg hoặc png', 'danger');
            $(this).val(null);
            return false;
        }
        if (fileData.size > limit) {
            notify('Dung lượng ảnh quá lớn', 'danger');
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
                image_preview.css('display', 'block');
                originImage.css('display', 'none');
            }
            var formData = new FormData(); // Currently empty
            formData.append('avatar', fileData);
            userAvatar = formData;
            fileReader.readAsDataURL(fileData);
        }
    })

    let images_src = $('#image-avatar-info').attr('src');
}

function userAvatarUpdate(id) {
    $.ajax({
        url: '/admin/update-avatar/' + id,
        type: 'POST',
        cache: false,
        contentType: false, // kiểu dữ liệu được đửa lên
        processData: false, // Set giá trị này là false nếu bạn không muốn dữ liệu được truyền vào thiết lập data sẽ được xử lý và biến thành một query kiểu chuỗi.
        data: userAvatar,
        success: function (result) {
            // cập nhật ngay lập tức avatar trên giao diện
            notify(result, 'success');
            $('#image-avatar-info').attr('src', 'assets/images/auth/' + result.imageSrc);
            $('#main-menu-header-profile').attr('src', 'assets/images/auth/' + result.imageSrc);
        },
        error: function (error) {
            notify(error, 'danger');
        }
    })
}
// ============================================================================================
// Products action
let productItem = {};

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


$(document).ready(function () {
    // PRODUCT ADD FORM SUBMIT;
    // user Action start
    // ==========================================
    // gọi hàm userinfo lấy dữ liệu
    oringinUserInfo = {
        name: $('#profile-username').val(),
        phone: $('#profile-phone').val(),
        email: $('#profile-email').val(),
        address: $('#profile-address').val(),
    }

    userInfo = oringinUserInfo;
    getUserAvatarUpdate();
    updateUserInfo();
    // update user info
    $('#checkinfo-change').bind('click', function () {
        if ($.isEmptyObject(userInfo)) {
            notify('Không có sự thay đổi nào', 'info');
            return false;
        }else {
            $('#user_form').submit();
        }
    })

    // user Action END
    // ==========================================


    // product Action START
    // ==========================================
    addProduct();
    $('.show-image-add').on('click', function () {
        $('.dropzone-edit-more').toggleClass('show');
    });

    // summernote editor
    $('#summernote').summernote({
        placeholder: 'Chi tiết sản phẩm',
        tabsize: 2,
        height: 300
    });
    // product action end 
    // =============================================================

    /*=============================================
    =            Tags input auto complete           =
    =============================================*/

    /*=====  Tags Input auto complete ======*/

    if (document.querySelector(".template")) {
        var previewNode = document.querySelector(".template");
        previewNode.id = "";
        var previewTemplate = previewNode.parentNode.innerHTML;
        previewNode.parentNode.removeChild(previewNode);

        var myDropzone = new Dropzone(document.body, { // Make the whole body a dropzone
            url: "/admin/product/add-product-image", // Set the url
            method: 'POST',
            paramName: "product-images",
            maxFiles: 4,
            maxFilesize: 1024,
            uploadMultiple: true,
            thumbnailWidth: 80,
            thumbnailHeight: 80,
            parallelUploads: 20,
            renameFilename: function (filename) {
                return new Date().getTime() + '_' + filename;
            },
            previewTemplate: previewTemplate,
            autoQueue: false, // Make sure the files aren't queued until manually added
            previewsContainer: "#previews", // Define the container to display the previews
            clickable: ".fileinput-button" // Define the element that should be used as click trigger to select files.
        });


        // thực hiện thêm hình ảnh
        $('#dropzoneSubmit').on('click', function (e) {
            //e.preventDefault();
            //console.log('Clicked');
            $("#product_form").validate({
                rules: {
                    product_name: {
                        required: true,
                        minlength: 2,
                    },
                    product_sku: {
                        required: true,
                        minlength: 5
                    },
                    product_price: {
                        required: true,
                        number: true
                    },
                    product_brand: {
                        required: true,
                    },
                    product_category: {
                        required: true
                    }
                },
                messages: {
                    product_name: {
                        required: "Vui lòng nhập tên sản phẩm",
                        minlength: "Tên sản phẩm phải có ít nhất 2 ký tự"
                    },
                    product_sku: {
                        required: "Vui lòng nhập mã sản phẩm",
                        minlength: "Mã sản phẩm phảo có ít nhất 2 ký tự"
                    },
                    product_price: {
                        required: "Vui lòng nhập giá sản phẩm",
                        number: 'giá sản phẩm phải là số'
                    },
                    product_brand: {
                        required: "Vui lòng chọn hãng sản xuất",
                    },
                    product_category: {
                        required: 'Vui lòng chọn danh mục cho sản phẩm'
                    }
                },
                invalidHandler: function (event, validator) {
                    var errors = validator.numberOfInvalids();
                    /*Here you will get your errors
                        if (errors) {
                          var message = errors == 1
                                ? 'You missed 1 field. It has been highlighted'
                                : 'You missed ' + errors + ' fields. They have been highlighted';
                          $("div.error span").html(message);
                          $("div.error").show();
                    } else {
                      $("div.error").hide();
                    }*/
                    alert("Vui lòng Validate " + errors);
                },
                submitHandler: function (element) {
                    myDropzone.processQueue();
                    var imgPathArrr = [];
                    if (myDropzone.files != "") {
                        for (var index = 0; index < myDropzone.files.length; index++) {
                            imgPathArrr.push(myDropzone.files[index].upload.filename);
                        }
                        var ImageJson = Object.assign({}, imgPathArrr);
                        // thiết lập dữ liệu cho input bên frontend để truyền lên server
                        $('#image_path').val(JSON.stringify(ImageJson));
                    }
                    $('.start').click();
                }
            });
        });

        $('#dropzoneEditProductSubmit').on('click', function (e) {
            //e.preventDefault();
            //console.log('Clicked');
            $("#product-edit-form").validate({
                rules: {
                    product_name: {
                        required: true,
                        minlength: 2,
                    },
                    product_sku: {
                        required: true,
                        minlength: 5
                    },
                    product_price: {
                        required: true,
                        number: true
                    },
                    product_brand: {
                        required: true,
                    },
                    product_category: {
                        required: true
                    }
                },
                messages: {
                    product_name: {
                        required: "Vui lòng nhập tên sản phẩm",
                        minlength: "Tên sản phẩm phải có ít nhất 2 ký tự"
                    },
                    product_sku: {
                        required: "Vui lòng nhập mã sản phẩm",
                        minlength: "Mã sản phẩm phảo có ít nhất 2 ký tự"
                    },
                    product_price: {
                        required: "Vui lòng nhập giá sản phẩm",
                        number: 'giá sản phẩm phải là số'
                    },
                    product_brand: {
                        required: "Vui lòng chọn hãng sản xuất",
                    },
                    product_category: {
                        required: 'Vui lòng chọn danh mục cho sản phẩm'
                    }
                },
                invalidHandler: function (event, validator) {
                    var errors = validator.numberOfInvalids();
                    /*Here you will get your errors
                        if (errors) {
                          var message = errors == 1
                                ? 'You missed 1 field. It has been highlighted'
                                : 'You missed ' + errors + ' fields. They have been highlighted';
                          $("div.error span").html(message);
                          $("div.error").show();
                    } else {
                      $("div.error").hide();
                    }*/
                    alert("Vui lòng Validate " + errors);
                },
                submitHandler: function (element) {
                    myDropzone.processQueue();
                    var imgPathArrr = [];
                    if (myDropzone.files != "") {
                        for (var index = 0; index < myDropzone.files.length; index++) {
                            imgPathArrr.push(myDropzone.files[index].upload.filename);
                        }
                        var ImageJson = Object.assign({}, imgPathArrr);
                        // thiết lập dữ liệu cho input bên frontend để truyền lên server
                        $('#image_path').val(JSON.stringify(ImageJson));
                    }
                    $('#product-edit-form').submit();
                    $('.start').click();
                }
            });
        });


        // thực hiện update hoặc thêm hình ảnh.
        $('#save-button-product-image').on('click', function (param) {
            urlOption = $(this).attr('data-url');
            var imgPathArrr = [];
            if (myDropzone.files != "") {
                $("#image_path_form").append(
                    "<input type='hidden' name='image_path' id='image_path'"
                    + "class='form-control form-bg-inverse'"
                    + "placeholder='Đường dẫn sản phẩm'>"
                );
                myDropzone.url = urlOption;
                myDropzone.processQueue();
                for (var index = 0; index < myDropzone.files.length; index++) {
                    imgPathArrr.push(myDropzone.files[index].upload.filename);
                }
                $('#image_path').val(imgPathArrr);
                $("#product-edit-form").submit(function () {
                });
            } else {
                $("#product-edit-form").submit();
            }
        })

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
    /*=============================================
    =            Section Search block            =
    =============================================*/
    
    
    
    
    /*=====  End of Section Search block  ======*/
    
    


})





