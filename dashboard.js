// =====================================
// GROWTHHUB PRO - DASHBOARD
// =====================================

async function loadDashboard() {

  // -------------------------------------
  // 1. Get current session
  // -------------------------------------

  const {
    data: { session },
    error: sessionError
  } = await supabaseClient.auth.getSession();

  if (sessionError) {
    console.error("Session error:", sessionError);
    return;
  }

  // -------------------------------------
  // 2. User not logged in
  // -------------------------------------

  if (!session) {
    window.location.href = "index.html";
    return;
  }

  const user = session.user;

  console.log("Logged user:", user);

  // -------------------------------------
  // 3. Get profile from database
  // -------------------------------------

  const {
    data: profile,
    error: profileError
  } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) {

    console.error("Profile error:", profileError);

    // Email still works from Auth
    setText("userEmail", user.email);

    // Fallback name
    setText(
      "userName",
      user.user_metadata?.full_name || "GrowthHub Member"
    );

    return;
  }

  console.log("Profile:", profile);

  // -------------------------------------
  // 4. User information
  // -------------------------------------

  setText(
    "userEmail",
    profile.email || user.email
  );

  setText(
    "userName",
    profile.full_name || "GrowthHub Member"
  );

  // -------------------------------------
  // 5. Profile statistics
  // -------------------------------------

  setText(
    "userPoints",
    profile.points ?? 0
  );

  setText(
    "userLevel",
    profile.level ?? 1
  );

  setText(
    "userRole",
    profile.role || "Member"
  );

  // -------------------------------------
  // 6. Optional statistics
  // -------------------------------------

  setText(
    "userXP",
    profile.points ?? 0
  );

}


// =====================================
// Helper
// =====================================

function setText(id, value) {

  const element = document.getElementById(id);

  if (element) {
    element.textContent = value;
  }

}


// =====================================
// Start Dashboard
// =====================================

loadDashboard();
