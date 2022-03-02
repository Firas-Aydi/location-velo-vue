<template>
  <div >
    <form class="card col-md-2 form-wrapper mt-5 p-3" style=" margin: 0 auto; background-color:#eee">
    <h4><strong>Login</strong></h4>
      <label for="email"><strong>E-Mail Address</strong></label>
      <div>
        <input id="email" type="email" v-model="email" class="form-control" placeholder="Email" required />
      </div>
      <div>
        <label for="password"><strong>Password</strong></label>
        <div>
          <input id="password" type="password" v-model="password" class="form-control" placeholder="Mot de passe" required autocomplete/>
        </div>
      </div>
      <div>
        <button class="btn btn-outline-success m-2" type="submit" @click="handleSubmit">
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      if (this.password.length > 0) {
        this.$http
          .post("http://localhost:3000/auth", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            let role = response.data.role;
            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("email", this.email);
            // this.$store.commit("updateEmail",{email: this.email})
            if (role === "Administrateur") {
              this.$router.push({ path: "user" });
            } else if (role === "Responsable commercial") {
              this.$router.push({ path: "tarif" });
            } else if (role === "Responsable de location") {
              this.$router.push({ path: "location" });
            } else if (role === "Responsable vélo et guide") {
              this.$router.push({ path: "velo" });
            } else {
              this.$router.push({ path: "reserver" });
            }
          })
          .catch(function(error) {
            if(error.response.status==401){
            alert("Vos données de connexion sont incorrectes");}
          });
      }
    },
  },
};
</script>
