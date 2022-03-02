<template>
   <div>
        <div class="card col-md-12 form-wrapper mb-5 pt-3" style="width: 500px; margin: 0 auto; background-color:#eee">
          <h4 class="text-center mt-20">
            <small>
            <button class="btn btn-success" v-on:click="navigate()"> Retour </button>
            </small>
          </h4>
          <h2><strong> Ajouter Type Client </strong></h2>
          <form id="create-post-form" @submit.prevent="createTypeClient">
               <div class="form-group col-md-12">
                <label for="title"><strong> Type Client </strong></label>
                <input type="text" id="TypeClient" v-model="type" name="title" class="form-control" placeholder="Type Client" required>
               </div>

            <p v-if="errors.length">
              <b class="alert alert-danger" role="alert" v-for="error in errors" :key="error">{{ error }}</b>
            </p>
            <div class="form-group col-md-12 pull-right">
              <button class="btn btn-success" type="submit"> Ajouter Type Client </button>
            </div>          
          </form>
        </div>
    </div>
</template>

<script>
  import axios from "axios";
  import { server } from "../../helper";
  import router from "../../router";
export default {
  data() {
    return {
      type:"",
      typeClients:[],
      errors: [],
    };
  },
  created() {
    this.fetchTypeClients();
  },
  methods: {
    createTypeClient() {
      let exist=0
      this.errors = [];
      if (!this.validString(this.type)){
        this.errors.push('Vérifiez le type de client');
      }else{
      for(var j=0;j<this.typeClients.length;j++){
        if(this.typeClients[j].type==this.type){
          exist=exist+1;
        }
      }
      if(exist==0){
      let TypeClientData = {
        type: this.type,
      };
      this.__submitToServer(TypeClientData);
      }else{
        this.errors.push("Type client existe déja.");
      }
      }
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/type-client`, data).then(() => {
        router.go(-1);
      });
    },
    fetchTypeClients() {
      axios
        .get(`${server.baseURL}/type-client`)
        .then((data) => (this.typeClients = data.data));
    },
    validString: function (s) {
      var re = new RegExp(s.length<=20 && /^[a-zA-Z a-zA-Z À Â Ä Ç É È Ê Ë Î Ï Ô Ö Ù Û Ü Ÿ à â ä ç é è ê ë î ï ô ö ù û ü ÿ]+$/);
      return re.test(s);
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>
