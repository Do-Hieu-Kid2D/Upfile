using System;
using System.Collections.Generic;

using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace thuUpfile
{
    public partial class up : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                //lấy đc thông tin gửi lên
                HttpPostedFile anh_the = Request.Files[0];
                //đường dẫn tương đối : để lưu dv
                //đường dẫn này có thể truy cập trực tiếp từ URL
                //thư mục: /anh_the : nằm ở server, truy xuất từ gốc /

                // anh_the.FileName: tên file người dùng gửi như này!
                // Làm sao chế đc tên file đánh dấu đc người gửi mà k trùng!
                Random rnd = new Random();
                string month = rnd.Next(1, 13000000).ToString();
                string name_file_in_sever = month + "_" + anh_the.FileName;

                // Đường dẫn sever trong mục data tính từ file index đi vô!
                string path = $"/data/{name_file_in_sever}";

                // MapPath(path) tạo đừng dẫn tuyệt đối! đường dẫn tuyệt đối trên server : để lưu file bằng lệnh save_as
                string abs_path = Server.MapPath(path);
                anh_the.SaveAs(abs_path);
                // => đến đây là lưu đc rồi đấy! 

                Response.Write("path: " + path + " ; abs_path: "+abs_path);
            }
            catch (Exception ex)
            {
                Response.Write(ex.Message);
            }
        }

    }
}
