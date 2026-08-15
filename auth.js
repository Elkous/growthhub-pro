// ===============================
// GROWTHHUB PRO AUTHENTICATION
// ===============================


// ===============================
// REGISTER
// ===============================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

  registerForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const name =
      document.getElementById("registerName").value.trim();

    const email =
      document.getElementById("registerEmail").value.trim();

    const password =
      document.getElementById("registerPassword").value;

    const message =
      document.getElementById("registerMessage");


    message.textContent = "Creating account...";


    try {

      const { data, error } =
        await supabaseClient.auth.signUp({

          email: email,

          password: password,

          options: {

            data: {
              full_name: name
            }

          }

        });


      if (error) {
        throw error;
      }


      message.textContent =
        "Account created successfully!";


      /*
       * Supabase may require email confirmation.
       * If confirmation is enabled, the user
       * receives an email before login.
       */


      setTimeout(() => {

        window.location.href = "index.html";

      }, 1500);


    } catch (error) {

      message.textContent =
        error.message;

    }

  });

}



// ===============================
// LOGIN
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

  loginForm.addEventListener("submit", async function (e) {

    e.preventDefault();


    const email =
      document.getElementById("loginEmail").value.trim();

    const password =
      document.getElementById("loginPassword").value;


    const message =
      document.getElementById("loginMessage");


    message.textContent = "Logging in...";


    try {

      const { data, error } =
        await supabaseClient.auth.signInWithPassword({

          email: email,

          password: password

        });


      if (error) {
        throw error;
      }


      message.textContent =
        "Login successful! 🚀";


      setTimeout(() => {

        window.location.href = "dashboard.html";

      }, 500);


    } catch (error) {

      message.textContent =
        error.message;

    }

  });

}



// ===============================
// LOGOUT
// ===============================

async function logout() {

  const { error } =
    await supabaseClient.auth.signOut();


  if (error) {

    console.error(error);

    return;

  }


  window.location.href = "index.html";

}
