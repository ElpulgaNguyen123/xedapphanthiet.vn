
$(function () {
  var string = '';
  var stringAppend = function (id, sku, image, slug,  name) {
      return `<li> <a href="/xe-dap/chi-tiet/${slug}.${id}" title="${name}">
          <div class="main"> 
              <div class="left-side">
                  <img src="/public/uploads/products/${image}"/> 
              </div>
              <div class="right-side">
              <p> ${name} </p> 
                 <span>  sku : ${sku}  </span>
              </div>
          </div>
      </a>
  </li>`;
  }
  function getSearchData(sku) {
      string = '';
      $.ajax({
          url: '/xe-dap/search/' + sku,
          type: 'GET',
          success: function (result) {
              // cập nhật ngay lập tức avatar trên giao diện
              if (result.results.length > 0) {
                  for (var i = 0; i < result.results.length; i++) {
                      var image = {};
                      if (result.results[i].image.length > 0) {
                          image = JSON.parse(result.results[i].image);
                      } else {
                          image = '';
                      }
                      string += stringAppend(result.results[i].id, result.results[i].sku, image[0], result.results[i].slug, result.results[i].name)
                  }
                  $('.result_rows').append(string);
              } else {
                  $('.result_rows').append(`<li>  <span> Không tìm thấy... </span></a>
              </li>`);
              }
  
          },
          error: function (error) {
              notify(error, 'danger');
              console.log(error);
          }
      })
  }
  $('#searchInput').on('keyup', function () {

      $('.result_rows li').remove();
      var search_value = $(this).val();
      console.log(search_value);
      if (search_value == '') {
          $('.result_rows').css('display', 'none');
      } else {
          getSearchData(search_value);
          $('.result_rows').css('display', 'block');
      }
  });
})
