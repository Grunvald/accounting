<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Добавить запись</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs8 >
              <v-text-field label="Title" name="Title" v-model.trim="form.title"></v-text-field>
            </v-flex>
            <v-flex xs4 class="d-flex align-center">
                <v-text-field label="Price" name="Price" v-model.number="form.price" required></v-text-field>
              <span>BYN</span>
            </v-flex>
            <v-flex xs12>
              <v-textarea name="Description" v-model.trim="form.description" label="Description" value=""></v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click="save" :disabled="!form.price">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    name: "dialog-add",
    data: () => ({
      dialog: false,
      form:{},
    }),
    props:{
      id:''
    },
    methods:{
      save(){
        this.dialog = false;
        this.form.id = this.id;
        this.form.date = Date.now();
        this.$store.dispatch('addSpent', this.form);
      }
    }
  }
</script>
<style
    lang="scss" src=""
></style>