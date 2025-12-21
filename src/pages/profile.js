import instance from "../httpRequest";
export function profile() {
  return `
  <section class="fixed inset-0 w-full h-screen overflow-hidden">
      <img
        src="/images/login-photo.png"
        alt="login"
        class="w-full h-full object-cover block relative"
      />
      <span class="js-success-update fixed z-20 top-30 right-0 px-20 py-2.5 text-white bg-green-600 rounded-2xl
         translate-x-full opacity-0 transition-all duration-300 ease-in-out">Cập nhật thành công</span>

      <form
        class="absolute top-[calc(50%-20px)] left-1/2 -translate-x-1/2 -translate-y-1/2
               flex flex-col bg-white/50 backdrop-blur-xl w-[20%] p-8 rounded-[10px] " id="loginForm" 
      >
        <h2 class="text-2xl text-center text-white uppercase mb-6">Cập nhật thông tin</h2>

        <label class="text-white flex flex-col mb-5">Tên hiển thị
          <input
          type="text"
          placeholder="Email của bạn" id="availableName"
          class="w-full p-2 bg-white/50 text-gray-900  rounded-[5px]  border-0 outline-none focus:outline-none focus:ring-0" />
         <h3 class="hidden text-red-600 " id="noName">
            Vui lòng nhập tên hiển thị
          </h3>
        </label>
        <label class="text-white flex flex-col mb-5">Email
        <input
          type="text" id="availableEmail"
          placeholder="Mật khẩu của bạn"
          class="w-full p-2 bg-white/50 text-gray-900 rounded-[5px] border-0 outline-none focus:outline-none focus:ring-0"
        />
        <h3 class="hidden text-red-600 " id="noEmail">
            Vui lòng nhập email
          </h3>
        </label>
        <button
          class="px-5 py-2 bg-black rounded-xl mt-3 hover:bg-pink-400 cursor-pointer text-white" id="btn-update-profile" type="submit"
        >
          Đăng nhập
        </button>
      </form>
  `;
}
export function initUpdateProfile() {
  const updateForm = document.querySelector("#loginForm");
  const availableName = document.querySelector("#availableName");
  const availableEmail = document.querySelector("#availableEmail");
  const noName = document.querySelector("#noName");
  const noEmail = document.querySelector("#noEmail");
  const btnUpdate = document.querySelector("#btn-update-profile");
  const successLogin = document.querySelector(".js-success-update");
  const input = document.querySelectorAll("input");
  if (!updateForm || !btnUpdate) return;
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  updateForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;

    if (!availableName.value.trim()) {
      noName.classList.remove("hidden");
      availableName.classList.add("border", "border-red-600");
      isValid = false;
    } else {
      noName.classList.add("hidden");
      availableName.classList.remove("border-red-600");
    }

    if (!availableEmail.value.trim()) {
      noEmail.textContent = "Vui lòng nhập email";
      noEmail.classList.remove("hidden");
      availableEmail.classList.add("border", "border-red-600");
      isValid = false;
    } else if (!validateEmail(availableEmail.value.trim())) {
      noEmail.textContent = "Email không hợp lệ";
      noEmail.classList.remove("hidden");
      availableEmail.classList.add("border", "border-red-600");
      isValid = false;
    } else {
      noEmail.classList.add("hidden");
      availableEmail.classList.remove("border-red-600");
    }
    if (!isValid) return;
    if (successLogin) {
      successLogin.classList.remove("translate-x-full", "opacity-0");
      successLogin.classList.add("opacity-100");
    }

    setTimeout(() => {
      successLogin?.classList.add("opacity-0");
    }, 1500);
  });
  input.forEach((item) => {
    item.addEventListener("input", () => {
      item.value = item.value.replace(/[<>]/g, "");
    });
  });
}
export async function initAvailProfile() {}
