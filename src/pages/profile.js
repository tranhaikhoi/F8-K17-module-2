import instance from "../httpRequest";
export function profile() {
  return `
    <section class="fixed inset-0 w-full h-screen overflow-hidden">
      <img
        src="/images/login-photo.png"
        alt="login"
        class="w-full h-full object-cover block relative"
      />

      <span
        class="js-success-update fixed z-20 top-30 right-0 px-20 py-2.5
               text-white bg-green-600 rounded-2xl
               translate-x-full opacity-0 transition-all duration-300 ease-in-out"
      >
        Cập nhật thành công
      </span>

      <form
        class="absolute top-[calc(50%-20px)] left-1/2 -translate-x-1/2 -translate-y-1/2
               flex flex-col bg-white/50 backdrop-blur-xl w-[20%] p-8 rounded-[10px]"
        id="updateForm"
      >
        <h2 class="text-2xl text-center text-white uppercase mb-6">
          Cập nhật thông tin
        </h2>

        <!-- NAME -->
        <label class="text-white flex flex-col mb-5">
          Tên hiển thị
          <input
            type="text"
            id="availableName"
            class="w-full p-2 bg-white/50 text-gray-900 rounded-[5px]
                   border-0 outline-none focus:outline-none focus:ring-0"
          />
          <h3 class="hidden text-red-600" id="noName">
            Vui lòng nhập tên hiển thị
          </h3>
        </label>

        <!-- EMAIL -->
        <label class="text-white flex flex-col mb-5">
          Email
          <input
            type="text"
            id="availableEmail"
            class="w-full p-2 bg-white/50 text-gray-900 rounded-[5px]
                   border-0 outline-none focus:outline-none focus:ring-0"
          />
          <h3 class="hidden text-red-600" id="noEmail">
            Vui lòng nhập email
          </h3>
        </label>
        <button
          class="px-5 py-2 bg-black rounded-xl mt-3
                 hover:bg-pink-400 cursor-pointer text-white"
          id="btn-update-profile"
          type="submit"
        >
          Cập nhật
        </button>
      </form>
    </section>
  `;
}
export function initAvailProfile() {
  const availableNameEl = document.querySelector("#availableName");
  const availableEmailEl = document.querySelector("#availableEmail");

  if (!availableNameEl || !availableEmailEl) return;

  const user = localStorage.getItem("user");
  if (!user) return;

  try {
    const parsedUser = JSON.parse(user);
    availableNameEl.value = parsedUser.name || "";
    availableEmailEl.value = parsedUser.email || "";
  } catch (err) {
    console.error("Parse user error", err);
  }
}
export function initUpdateProfile() {
  const updateForm = document.querySelector("#updateForm");
  const availableName = document.querySelector("#availableName");
  const availableEmail = document.querySelector("#availableEmail");
  const noName = document.querySelector("#noName");
  const noEmail = document.querySelector("#noEmail");
  const btnUpdate = document.querySelector("#btn-update-profile");
  const successUpdateProfile = document.querySelector(".js-success-update");
  const input = document.querySelectorAll("input");

  if (!updateForm || !btnUpdate) return;

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  updateForm.addEventListener("submit", async (e) => {
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

    try {
      btnUpdate.disabled = true;

      await instance.patch("/auth/me", {
        name: availableName.value.trim(),
        email: availableEmail.value.trim(),
      });

      const user = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          name: availableName.value.trim(),
          email: availableEmail.value.trim(),
        })
      );

      successUpdateProfile.classList.remove("translate-x-full", "opacity-0");
      successUpdateProfile.classList.add("opacity-100");

      setTimeout(() => {
        successUpdateProfile.classList.add("opacity-0");
      }, 1200);

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (error) {
      console.error(error);
      alert(error.response.data.message || "Cập nhật thất bại");
    } finally {
      btnUpdate.disabled = false;
    }
  });

  // ===== CHỐNG XSS ===== //
  input.forEach((item) => {
    item.addEventListener("input", () => {
      item.value = item.value.replace(/[<>]/g, "");
    });
  });
}
