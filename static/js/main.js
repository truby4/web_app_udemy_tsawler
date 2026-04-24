let attention = Prompt();

(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(
    ".needs-validation",
  );

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false,
    );
  });
})();

function notify(msg, type) {
  notie.alert({
    type: type,
    text: msg,
  });
}

function notifyModal(title, text, icon, confirmButtonText) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: confirmButtonText,
  });
}

function Prompt() {
  let toast = function (c) {
    const {
      msg = "",
      icon = "success",
      position = "top-end",
    } = c;

    Swal.mixin({
      toast: true,
      title: msg,
      position: position,
      showConfirmButton: false,
      timer: 3000,
      icon: icon,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    }).fire({});
  };

  let success = function (c) {
    const { msg = "", title = "", footer = "" } = c;
    Swal.fire({
      icon: "success",
      title: title,
      text: msg,
      footer: footer,
    });
  };

  let error = function (c) {
    const { msg = "", title = "", footer = "" } = c;
    Swal.fire({
      icon: "error",
      title: title,
      text: msg,
      footer: footer,
    });
  };

  async function custom(c) {
    const { msg = "", title = "" } = c;

    const { value: formValues } = await Swal.fire({
      title: title,
      html: msg,
      backdrop: false,
      focusConfirm: false,
      showCancelButton: true,
      willOpen: () => {
        const elem = document.getElementById(
          "reservation-dates-modal",
        );
        new DateRangePicker(elem, {
          format: "yyyy-mm-dd",
          showOnFocus: true,
        });
      },
      preConfirm: () => {
        return [
          document.getElementById("start").value,
          document.getElementById("end").value,
        ];
      },
    });
    if (formValues) Swal.fire(JSON.stringify(formValues));
  }

  return {
    toast: toast,
    success: success,
    error: error,
    custom: custom,
  };
}
