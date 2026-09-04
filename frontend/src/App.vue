<script setup>
import { ref, onMounted } from "vue";

const tickets = ref([]);
const ticketCode = ref("");

async function getTickets() {
  const response = await fetch("http://localhost:5000/api/tickets");
  tickets.value = await response.json();
}

async function createTicket() {
  await fetch("http://localhost:5000/api/tickets", {
    method: "POST"
  });

  getTickets();
}

async function useTicket() {
  await fetch(`http://localhost:5000/api/tickets/${ticketCode.value}/use`, {
    method: "POST"
  });

  ticketCode.value = "";
  getTickets();
}

onMounted(() => {
  getTickets();
});

async function deleteTicket(code) {
  await fetch(`http://localhost:5000/api/tickets/${code}`, {
    method: "DELETE"
  });

  getTickets();
}

</script>

<template>
  <main>
    <h1>Biljettsystem</h1>

    <section>
      <h2>Skapa biljett</h2>
      <button @click="createTicket">Skapa ny biljett</button>
    </section>

    <section>
      <h2>Använd biljett</h2>

      <input
          v-model="ticketCode"
          type="text"
          placeholder="Ange biljettkod"
      >

      <button @click="useTicket">Använd biljett</button>
    </section>

    <section>
      <h2>Biljetter</h2>

      <p v-if="tickets.length === 0">
        Det finns inga biljetter.
      </p>

      <ul v-else>
        <li v-for="ticket in tickets" :key="ticket.id">
          {{ ticket.code }}

          <span v-if="ticket.used === 1">
      - Använd
    </span>

          <span v-else>
      - Oanvänd
      <button @click="deleteTicket(ticket.code)">
        Radera
      </button>
    </span>
        </li>
      </ul>
    </section>
  </main>
  
</template>