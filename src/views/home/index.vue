<template>
  <v-container grid-list-lg>
    <v-layout fill-height justify-space-between row wrap>
      <v-flex xs6>
        <v-card>
          <v-card-title primary-title>
            Заработал
          </v-card-title>
          <v-card-text>
            sdfsdfsdf
          </v-card-text>
          <v-card-actions>
            <v-btn flat outline>Добавить</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card>
          <v-card-title primary-title>
            Заработал
          </v-card-title>
          <v-card-text>
            sdfsdfsdf
          </v-card-text>
          <v-card-actions>
            <v-btn flat outline>Добавить</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card>
          <v-card-title>Продукты</v-card-title>
          <v-card-text><p v-text="$store.state.title.food"></p></v-card-text>
          <v-card-actions>
            <v-btn flat outline>Добавить</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card>
          <v-card-title>Одежда</v-card-title>
          <v-card-text></v-card-text>
          <v-card-actions>
            <v-btn flat outline>Добавить</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card>
          <v-card-title>Быт</v-card-title>
          <v-card-text></v-card-text>
          <v-card-actions>
            <v-btn flat outline>Добавить</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card>
          <v-card-title>Авто</v-card-title>
          <v-card-text v-text="$store.state.title.auto"></v-card-text>
          <v-card-actions>
            <v-btn flat outline>Добавить</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card>
          <v-card-title>Развлечения</v-card-title>
          <v-card-text></v-card-text>
          <v-card-actions>
            <v-btn flat outline>Добавить</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card>
          <v-card-title>Другое</v-card-title>
          <v-card-text></v-card-text>
          <v-card-actions>
            <h1></h1>
            <v-btn flat outline>Добавить</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "index",
  }
</script>

<style lang="scss" src=""></style>