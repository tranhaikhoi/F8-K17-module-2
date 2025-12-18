import instance from "../httpRequest";
export default function login() {
  return `
    <section class="fixed inset-0 w-full h-screen overflow-hidden">
      <img
        src="/images/login-photo.png"
        alt="login"
        class="w-full h-full object-cover block relative"
      />

      <form
        class="absolute top-[calc(50%-20px)] left-1/2 -translate-x-1/2 -translate-y-1/2
               flex flex-col bg-white/50 backdrop-blur-xl w-[20%] p-8 rounded-[10px] hidden" id="loginForm" 
      >
        <h2 class="text-2xl text-center text-white uppercase mb-6">đăng nhập</h2>

        <label class="text-white flex flex-col mb-5">Email
          <input
          type="text"
          placeholder="Email của bạn" id="emailLog"
          class="w-full p-2 bg-white/50 text-gray-900  rounded-[5px]  border-0 outline-none focus:outline-none focus:ring-0" />
         <h3 class="hidden text-red-600 " id="emailErrorTextLog">
            Email không được để trống
          </h3>
        </label>
        <label class="text-white flex flex-col mb-5">Password
        <input
          type="password" id="passwordLog"
          placeholder="Mật khẩu của bạn"
          class="w-full p-2 bg-white/50 text-gray-900 rounded-[5px] border-0 outline-none focus:outline-none focus:ring-0"
        />
        <h3 class="hidden text-red-600 " id="passErrorTextLog">
            Password không được để trống
          </h3>
        </label>
        <button
          class="px-5 py-2 bg-black rounded-xl mb-8 hover:bg-pink-400 cursor-pointer text-white" id="btn-login"
        >
          Đăng nhập
        </button>

        <p class="text-center text-black">
          Bạn chưa có tài khoản?
          <a class="cursor-pointer text-white underline js-register-login"> Đăng ký</a>
        </p>
      </form>
      <!---------------------------------------------------------ĐĂNG KÝ------------------------------------------------------------------>
      <form
        class="absolute top-30 left-1/2 -translate-x-1/2
         flex flex-col bg-white/50 backdrop-blur-xl w-[28%] px-14 py-10 rounded-[10px] js-register " id="registerForm"
      >
        <h2 class="text-2xl text-center text-white uppercase mb-6">đăng ký</h2>

        <label class="text-white flex flex-col mb-3">Email
        <input
          type="text"
          placeholder="Email của bạn" id="email"
          class="w-full p-2 bg-white/50 text-gray-900  rounded-[5px]  outline-none focus:outline-none focus:ring-0"
        />
        <h3 class="hidden text-red-600 " id="emailErrorText">
            Email không được để trống
          </h3>
          </label>
        <label class="text-white flex flex-col mb-3">Tên hiển thị
        <input
          type="text"
          placeholder="Tên hiển thị của bạn" id="userName"
          class="w-full p-2 bg-white/50 text-gray-900  rounded-[5px]  outline-none focus:outline-none focus:ring-0 "
        />
        <h3 class="hidden text-red-600 " id="userNameErrorText">
            Tên không được để trống
          </h3>
          </label>
        <label class="text-white flex flex-col mb-3">Mật khẩu
        <input
          type="password"
          placeholder="Mật khẩu" id="password"
          class="w-full p-2 bg-white/50 text-gray-900  rounded-[5px]  outline-none focus:outline-none focus:ring-0 "
        />
        <h3 class="hidden text-red-600 " id="passwordErrorText">
            Password không được để trống
          </h3>
          </label>
        <label class="text-white flex flex-col mb-6">Nhập lại mật khẩu
        <input
          type="password"
          placeholder="Nhập lại mật khẩu" id="rePassword"
          class="w-full p-2 bg-white/50 text-gray-900  rounded-[5px]  outline-none focus:outline-none focus:ring-0 "
        />
         <h3 class="hidden text-red-600 " id="rePassErrorText">
            Password không được để trống
          </h3>
          <h3 class="hidden text-red-600" id="passCheck">Mật khẩu không trùng khớp</h3>
          </label>
        <button
          class="px-5 py-2 bg-black rounded-xl mb-8 hover:bg-pink-400 cursor-pointer text-white btn-res" type="submit"
        >
          Đăng ký
        </button>

        <p class="text-center text-black">
          Bạn đã có tài khoản?
          <a class="cursor-pointer text-white underline js-login" > Đăng nhập</a>
        </p>
      </form>
    </section>
  `;
}
export function initRegister() {
  const registerForm = document.querySelector("#registerForm");
  const emailEl = document.querySelector("#email");
  const userNameEl = document.querySelector("#userName");
  const passwordEl = document.querySelector("#password");
  const rePasswordEl = document.querySelector("#rePassword");
  const passCheckEl = document.querySelector("#passCheck");
  const input = document.querySelectorAll("input");
  const emailErrorText = document.querySelector("#emailErrorText");
  const userNameErrorText = document.querySelector("#userNameErrorText");
  const passwordErrorText = document.querySelector("#passwordErrorText");
  const rePassErrorText = document.querySelector("#rePassErrorText");
  const textLogin = document.querySelector(".js-login");
  const btnRes = document.querySelector(".btn-res");
  const loginForm = document.querySelector("#loginForm");

  if (!btnRes) return; // tránh lỗi nếu chưa render HTML
  // Hàm kiểm tra email
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Email
    if (!emailEl.value.trim()) {
      emailErrorText.textContent = "Email không được để trống";
      emailErrorText.classList.remove("hidden");
      emailEl.classList.add("border", "border-red-600");
    } else if (!validateEmail(emailEl.value.trim())) {
      emailErrorText.textContent = "Email không hợp lệ";
      emailErrorText.classList.remove("hidden");
      emailEl.classList.add("border", "border-red-600");
    } else {
      emailErrorText.classList.add("hidden");
      emailEl.classList.remove("border-red-600");
    }

    // Tên hiển thị
    if (!userNameEl.value.trim()) {
      userNameErrorText.classList.remove("hidden");
      userNameEl.classList.add("border", "border-red-600");
    } else {
      userNameErrorText.classList.add("hidden");
      userNameEl.classList.remove("border-red-600");
    }

    // Password
    if (!passwordEl.value.trim()) {
      passwordErrorText.textContent = "Password không được để trống";
      passwordErrorText.classList.remove("hidden");
      passwordEl.classList.add("border", "border-red-600");
    } else if (passwordEl.value.length < 8) {
      passwordErrorText.textContent = "Password phải có ít nhất 8 ký tự";
      passwordErrorText.classList.remove("hidden");
      passwordEl.classList.add("border", "border-red-600");
    } else {
      passwordErrorText.classList.add("hidden");
      passwordEl.classList.remove("border-red-600");
    }

    // Re-pass
    if (!rePasswordEl.value.trim()) {
      rePassErrorText.textContent = "Password không được để trống";
      rePassErrorText.classList.remove("hidden");
      passCheckEl.classList.add("hidden");
      rePasswordEl.classList.add("border", "border-red-600");
    } else if (passwordEl.value !== rePasswordEl.value) {
      rePassErrorText.classList.add("hidden");
      passCheckEl.classList.remove("hidden");
      rePasswordEl.classList.add("border", "border-red-600");
    } else {
      rePassErrorText.classList.add("hidden");
      passCheckEl.classList.add("hidden");
      rePasswordEl.classList.remove("border-red-600");
    }
  });
  //Chống XSS
  input.forEach((item) => {
    item.addEventListener("input", () => {
      item.value = item.value.replace(/[<>]/g, "");
    });
  });
  textLogin.addEventListener("click", (e) => {
    e.preventDefault();

    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
  });
  //==================================================gửi dữ liệu lên======================================//

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailEl.value.trim();
    const name = userNameEl.value.trim();
    const password = passwordEl.value.trim();
    const confirmPassword = rePasswordEl.value.trim();
    if (!email || !name || !password || !confirmPassword) return;

    try {
      btnRes.disabled = true;

      const response = await instance.post("/auth/register", {
        name,
        email,
        password,
        confirmPassword,
      });

      const data = response.data;

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Đăng ký thành công!");
      registerForm.classList.add("hidden");
      loginForm.classList.remove("hidden");
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Đăng ký thất bại!");
    } finally {
      btnRes.disabled = false;
    }
  });
}

//==================================================Đăng nhập============================================//
export function initLogin() {
  const emailLog = document.querySelector("#emailLog");
  const passwordLog = document.querySelector("#passwordLog");
  const emailErrorTextLog = document.querySelector("#emailErrorTextLog");
  const passErrorTextLog = document.querySelector("#passErrorTextLog");
  const btnLogin = document.querySelector("#btn-login");
  const registerText = document.querySelector(".js-register-login");
  const inputLog = document.querySelectorAll("input");
  btnLogin.addEventListener("click", (e) => {
    e.preventDefault();

    if (!emailLog.value.trim()) {
      emailErrorTextLog.classList.remove("hidden");
      emailErrorTextLog.textContent = "Email không được để trống";
    } else {
      emailErrorTextLog.classList.add("hidden");
    }

    if (!passwordLog.value.trim()) {
      passErrorTextLog.classList.remove("hidden");
      passErrorTextLog.textContent = "Password không được để trống";
    } else {
      passErrorTextLog.classList.add("hidden");
    }
  });
  registerText.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
  });
  //Chống XSS
  inputLog.forEach((inti) => {
    inti.addEventListener("input", () => {
      inti.value = inti.value.replace(/[<>]/g, "");
    });
  });
}
