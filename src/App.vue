<script setup lang="ts">
import { ref } from "vue";
import { Expr, parse } from "./calc/parser";
import { evaluate } from "./calc/interpreter";
const input = ref("");

function result() {

  try {
    const parsed = parse(input.value).body as Expr;
    const res = evaluate(parsed);
    input.value = res.value.toString();
  } catch (err: any) {
    alert(`ocurrio un error, ${err.message}`);
  }
}

function parserResult() {
  try {
    alert(JSON.stringify(parse(input.value), null, "\t"));
  } catch (err: any) {
    alert(`ocurrio un error, ${err.message}`);
  }
}
</script>

<template>
  <div class="main">
    <div class="col">
      <div class="input-box">
        <input v-model="input" class="mb" type="text">
        <button @click="result" class="mb">resultado</button>
        <button @click="parserResult">resultado del parser</button>
      </div>
      <div class="history-wrap">
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  height: 100vh;
  background-color: aliceblue;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mb {
  margin-bottom: 10px;
}

input {
  border: 1px solid #333;
  border-radius: 20px;
  height: 40px;
}

button {
  border-radius: 20px;
}

.input-box {
  -webkit-box-shadow: 10px 10px 50px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 50px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 10px 50px 0px rgba(0, 0, 0, 0.75);
  padding: 20px;
  display: flex;
  border-radius: 20px;
  background-color: #333;
  flex-direction: column;
  justify-content: center;
}

.history-wrap {
  height: 50%;
}

.col {
  padding: 20px;
  width: 500px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
