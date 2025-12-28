import instance from "../httpRequest";
export function changePassword() {
  return `
    <section class="fixed inset-0 w-full h-screen overflow-hidden">
      <img
        src="/images/login-photo.png"
        alt="change-password"
        class="w-full h-full object-cover block relative"
      />
      <span
        class="js-success-change-password fixed z-20 top-30 right-0 px-20 py-2.5
               text-white bg-green-600 rounded-2xl
               translate-x-full opacity-0 transition-all duration-300 ease-in-out"
      >
        Đổi mật khẩu thành công
      </span>

      <form
        class="absolute top-[calc(50%-20px)] left-1/2 -translate-x-1/2 -translate-y-1/2
               flex flex-col bg-white/50 backdrop-blur-xl w-[22%] p-8 rounded-[10px]"
        id="changePasswordForm"
      >
        <h2 class="text-2xl text-center text-white uppercase mb-6">
          Đổi mật khẩu
        </h2>

        <!-- OLD PASSWORD -->
        <label class="text-white flex flex-col mb-4">
          Mật khẩu hiện tại
          <input
            type="password"
            id="oldPassword"
            class="w-full p-2 bg-white/50 text-gray-900 rounded-[5px]
                   outline-none focus:ring-0"
          />
          <h3 class="hidden text-red-600" id="oldPassError">
            Vui lòng nhập mật khẩu hiện tại
          </h3>
        </label>

        <!-- NEW PASSWORD -->
        <label class="text-white flex flex-col mb-4">
          Mật khẩu mới
          <input
            type="password"
            id="newPassword"
            class="w-full p-2 bg-white/50 text-gray-900 rounded-[5px]
                   outline-none focus:ring-0"
          />
          <h3 class="hidden text-red-600" id="newPassError">
            Mật khẩu phải có ít nhất 6 ký tự
          </h3>
        </label>

        <!-- CONFIRM PASSWORD -->
        <label class="text-white flex flex-col mb-6">
          Xác nhận mật khẩu mới
          <input
            type="password"
            id="confirmPassword"
            class="w-full p-2 bg-white/50 text-gray-900 rounded-[5px]
                   outline-none focus:ring-0"
          />
          <h3 class="hidden text-red-600" id="confirmPassError">
            Mật khẩu không trùng khớp
          </h3>
        </label>

        <button
          class="px-5 py-2 bg-black rounded-xl hover:bg-pink-400
                 cursor-pointer text-white"
          id="btn-change-password"
          type="submit"
        >
          Đổi mật khẩu
        </button>
      </form>
    </section>
  `;
}

export function initChangePassword(router) {
  const form = document.querySelector("#changePasswordForm");
  const oldPassword = document.querySelector("#oldPassword");
  const newPassword = document.querySelector("#newPassword");
  const confirmPassword = document.querySelector("#confirmPassword");

  const oldPassError = document.querySelector("#oldPassError");
  const newPassError = document.querySelector("#newPassError");
  const confirmPassError = document.querySelector("#confirmPassError");

  const btnSubmit = document.querySelector("#btn-change-password");
  const successToast = document.querySelector(".js-success-change-password");
  const input = document.querySelectorAll("input");

  if (!form || !btnSubmit) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let isValid = true;
    if (!oldPassword.value.trim()) {
      oldPassError.classList.remove("hidden");
      isValid = false;
    } else {
      oldPassError.classList.add("hidden");
    }
    if (newPassword.value.trim().length < 6) {
      newPassError.classList.remove("hidden");
      isValid = false;
    } else {
      newPassError.classList.add("hidden");
    }

    if (newPassword.value !== confirmPassword.value) {
      confirmPassError.classList.remove("hidden");
      isValid = false;
    } else {
      confirmPassError.classList.add("hidden");
    }

    if (!isValid) return;

    try {
      btnSubmit.disabled = true;

      await instance.patch("/auth/change-password", {
        oldPassword: oldPassword.value.trim(),
        password: newPassword.value.trim(),
        confirmPassword: confirmPassword.value.trim(),
      });

      successToast.classList.remove("translate-x-full", "opacity-0");
      successToast.classList.add("opacity-100");

      setTimeout(() => {
        successToast.classList.add("opacity-0");
      }, 1200);

      setTimeout(() => {
        router.navigate("/login");
      }, 1500);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Đổi mật khẩu thất bại");
    } finally {
      btnSubmit.disabled = false;
    }
  });

  // ===== CHỐNG XSS ===== //
  input.forEach((item) => {
    item.addEventListener("input", () => {
      item.value = item.value.replace(/[<>]/g, "");
    });
  });
}
