<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 flex relative overflow-hidden"
  >
    <button class="absolute top-0 right-0 m-4 text-gray-700" @click="logout">
      Logout
    </button>
    <div class="mx-auto mt-20">
      <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">
        Your Invoice
      </h1>
      <div class="p-10 w-full">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/3 px-3 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="customer-name"
            >
              Customer Name
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="customer-name"
              v-model="pdf.customerName"
              type="text"
              placeholder="Jane"
            />
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="email-address"
            >
              Email Address
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="email-address"
              type="text"
              v-model="pdf.emailAddress"
              placeholder="Doe"
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/3 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="invoice-number"
            >
              Invoice Number
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="invoice-number"
              type="text"
              v-model="pdf.invoiceNumber"
              placeholder="Doe"
            />
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="subcontractor-name"
            >
              Subcontractor Name
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="subcontractor-name"
              v-model="pdf.subcontractorName"
              type="text"
              placeholder="Jane"
            />
          </div>
          <div class="w-full md:w-1/4 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="total-amount"
            >
              Total Amount Due
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="total-amount"
              v-model="pdf.totalAmountDue"
              type="number"
              placeholder="Doe"
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="project-name"
            >
              Project Name
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="project-name"
              v-model="pdf.projectName"
              type="text"
              placeholder="Jane"
            />
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="service-location"
            >
              Service Location
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="service-location"
              v-model="pdf.serviceLocation"
              type="text"
              placeholder="Doe"
            />
          </div>
        </div>
        <table class="w-full my-2 whitespace-no-wrap border border-gray-200">
          <thead>
            <tr>
              <th class="px-4 py-2 bg-gray-200 text-gray-700 text-xs font-bold">
                Service Description
              </th>
              <th class="px-4 py-2 bg-gray-200 text-gray-700 text-xs font-bold">
                Date
              </th>
              <th class="px-4 py-2 bg-gray-200 text-gray-700 text-xs font-bold">
                Quantity
              </th>
              <th class="px-4 py-2 bg-gray-200 text-gray-700 text-xs font-bold">
                Rate
              </th>
              <th class="px-4 py-2 bg-gray-200 text-gray-700 text-xs font-bold">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in pdf.serviceDescription" :key="index">
              <td class="border px-4 py-2"></td>
              <td class="border px-4 py-2">
                <input
                  type="date"
                  v-model="item.date"
                  class="bg-transparent text-gray-700 rounded"
                />
              </td>
              <td class="border px-4 py-2">
                <input
                  type="number"
                  @change="calTotal('serviceDescription')"
                  v-model="item.quantity"
                  class="bg-transparent w-20 text-gray-700 rounded"
                  name=""
                />
              </td>
              <td class="border px-4 py-2">
                <input
                  type="number"
                  v-model="item.rate"
                  @change="calTotal('serviceDescription')"
                  class="bg-transparent w-20 text-gray-700 rounded"
                  name=""
                />
              </td>
              <td class="border relative px-4 py-2 text-center">
                {{ item.amount }}
                <button
                  class="absolute top-2"
                  style="right: -30px"
                  @click="removeRow('serviceDescription', index)"
                >
                  <img width="18" src="@/assets/cross.svg" alt="" />
                </button>
              </td>
            </tr>
            <tr>
              <td class="border px-4 py-2">Subtotal</td>
              <td class="border px-4 py-2"></td>
              <td class="border px-4 py-2"></td>
              <td class="border px-4 py-2"></td>
              <td class="border relative px-4 py-2 text-center">
                {{ this.pdf.serviceDescriptionSubtotal }}
                <button
                  class="absolute"
                  style="right: -30px"
                  @click="addRow('serviceDescription')"
                >
                  <img width="18" src="@/assets/add.svg" alt="" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <table class="w-full my-2 whitespace-no-wrap border border-gray-200">
          <thead>
            <tr>
              <th class="px-4 py-2 bg-gray-200 text-gray-700 text-xs font-bold">
                Miles from port to site
              </th>
              <th class="px-4 py-2 bg-gray-200 text-gray-700 text-xs font-bold">
                Date
              </th>
              <th class="px-4 py-2 bg-gray-200 text-gray-700 text-xs font-bold">
                Quantity
              </th>
              <th class="px-4 py-2 bg-gray-200 text-gray-700 text-xs font-bold">
                Rate
              </th>
              <th class="px-4 py-2 bg-gray-200 text-gray-700 text-xs font-bold">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in pdf.miles" :key="index">
              <td class="border px-4 py-2"></td>
              <td class="border px-4 py-2">
                <input
                  type="date"
                  v-model="item.date"
                  class="bg-transparent text-gray-700 rounded"
                />
              </td>
              <td class="border px-4 py-2">
                <input
                  type="number"
                  @change="calTotal('miles')"
                  v-model="item.quantity"
                  class="bg-transparent w-20 text-gray-700 rounded"
                  name=""
                />
              </td>
              <td class="border px-4 py-2">
                <input
                  type="number"
                  v-model="item.rate"
                  @change="calTotal('miles')"
                  class="bg-transparent w-20 text-gray-700 rounded"
                  name=""
                />
              </td>
              <td class="border relative px-4 py-2 text-center">
                {{ item.amount }}
                <button
                  class="absolute top-2"
                  style="right: -30px"
                  @click="removeRow('miles', index)"
                >
                  <img width="18" src="@/assets/cross.svg" alt="" />
                </button>
              </td>
            </tr>
            <tr>
              <td class="border px-4 py-2">Subtotal</td>
              <td class="border px-4 py-2"></td>
              <td class="border px-4 py-2"></td>
              <td class="border px-4 py-2"></td>
              <td class="border relative px-4 py-2 text-center">
                {{ this.pdf.milesSubtotal }}
                <button
                  class="absolute"
                  style="right: -30px"
                  @click="addRow('miles')"
                >
                  <img width="18" src="@/assets/add.svg" alt="" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <table class="w-full my-4 whitespace-no-wrap border border-gray-200">
          <thead>
            <tr>
              <th class="px-4 py-2 bg-gray-200 text-gray-700 text-xs font-bold">
                Materials and Parts
              </th>
              <th class="px-4 py-2 bg-gray-200 text-gray-700 text-xs font-bold">
                Date
              </th>
              <th class="px-4 py-2 bg-gray-200 text-gray-700 text-xs font-bold">
                Quantity
              </th>
              <th class="px-4 py-2 bg-gray-200 text-gray-700 text-xs font-bold">
                Rate
              </th>
              <th class="px-4 py-2 bg-gray-200 text-gray-700 text-xs font-bold">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in pdf.materialsAndParts" :key="index">
              <td class="border px-4 py-2"></td>
              <td class="border px-4 py-2">
                <input
                  type="date"
                  v-model="item.date"
                  class="bg-transparent text-gray-700 rounded"
                />
              </td>
              <td class="border px-4 py-2">
                <input
                  type="number"
                  @change="calTotal('materialsAndParts')"
                  v-model="item.quantity"
                  class="bg-transparent w-20 text-gray-700 rounded"
                  name=""
                />
              </td>
              <td class="border px-4 py-2">
                <input
                  type="number"
                  v-model="item.rate"
                  @change="calTotal('materialsAndParts')"
                  class="bg-transparent w-20 text-gray-700 rounded"
                  name=""
                />
              </td>
              <td class="border relative px-4 py-2 text-center">
                {{ item.amount }}
                <button
                  class="absolute top-2"
                  style="right: -30px"
                  @click="removeRow('materialsAndParts', index)"
                >
                  <img width="18" src="@/assets/cross.svg" alt="" />
                </button>
              </td>
            </tr>
            <tr>
              <td class="border px-4 py-2">Subtotal</td>
              <td class="border px-4 py-2"></td>
              <td class="border px-4 py-2"></td>
              <td class="border px-4 py-2"></td>
              <td class="border relative px-4 py-2 text-center">
                {{ this.pdf.materialsAndPartsSubtotal }}
                <button
                  class="absolute"
                  style="right: -30px"
                  @click="addRow('materialsAndParts')"
                >
                  <img width="18" src="@/assets/add.svg" alt="" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <table class="w-full my-4 whitespace-no-wrap border border-gray-200">
          <thead>
            <tr>
              <th class="px-4 py-2 bg-gray-200 text-gray-700 text-xs font-bold">
                Parking and Tolls
              </th>
              <th class="px-4 py-2 bg-gray-200 text-gray-700 text-xs font-bold">
                Date
              </th>
              <th class="px-4 py-2 bg-gray-200 text-gray-700 text-xs font-bold">
                Quantity
              </th>
              <th class="px-4 py-2 bg-gray-200 text-gray-700 text-xs font-bold">
                Rate
              </th>
              <th class="px-4 py-2 bg-gray-200 text-gray-700 text-xs font-bold">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in pdf.parkingAndTolls" :key="index">
              <td class="border px-4 py-2"></td>
              <td class="border px-4 py-2">
                <input
                  type="date"
                  v-model="item.date"
                  class="bg-transparent text-gray-700 rounded"
                />
              </td>
              <td class="border px-4 py-2">
                <input
                  type="number"
                  @change="calTotal('parkingAndTolls')"
                  v-model="item.quantity"
                  class="bg-transparent w-20 text-gray-700 rounded"
                  name=""
                />
              </td>
              <td class="border px-4 py-2">
                <input
                  type="number"
                  v-model="item.rate"
                  @change="calTotal('parkingAndTolls')"
                  class="bg-transparent w-20 text-gray-700 rounded"
                  name=""
                />
              </td>
              <td class="border relative px-4 py-2 text-center">
                {{ item.amount }}
                <button
                  class="absolute top-2"
                  style="right: -30px"
                  @click="removeRow('parkingAndTolls', index)"
                >
                  <img width="18" src="@/assets/cross.svg" alt="" />
                </button>
              </td>
            </tr>
            <tr>
              <td class="border px-4 py-2">Subtotal</td>
              <td class="border px-4 py-2"></td>
              <td class="border px-4 py-2"></td>
              <td class="border px-4 py-2"></td>
              <td class="border relative px-4 py-2 text-center">
                {{ this.pdf.parkingAndTollsSubtotal }}
                <button
                  class="absolute"
                  style="right: -30px"
                  @click="addRow('parkingAndTolls')"
                >
                  <img width="18" src="@/assets/add.svg" alt="" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <table class="w-full my-4 whitespace-no-wrap border border-gray-200">
          <tbody>
            <tr>
              <td class="border px-4 py-2">Invoice Total Amount</td>
              <td class="border relative px-4 py-2 text-center">
                {{ this.pdf.invoiceTotalAmount }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex place-content-between my-5">
          <div>
            <p v-if="isError" class="text-red-500 text-xs italic">
              Invoice total should be more than 0.
            </p>
          </div>
          <button
            @click="submitForm()"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Get Invoice
          </button>
        </div>
      </div>
      <p class="text-gray-600 text-md text-center mb-7">
        Payment Terms: All Invoices paid net 15
      </p>
    </div>
  </div>
</template>

<script>
import { removeToken } from "@/services/localStorage";
import { post } from "@/services/http";

export default {
  name: "InvoiceForm",
  data() {
    return {
      isError: false,
      pdf: {
        subcontractorName: "",
        invoiceNumber: "",
        invoiceDate: "",
        customerName: "",
        emailAddress: "",
        totalAmountDue: "",
        projectName: "",
        serviceLocation: "",
        serviceDescription: [],
        materialsAndParts: [],
        miles: [],
        parkingAndTolls: [],
        invoiceTotalAmount: 0,
        parkingAndTollsSubtotal: 0,
        milesSubtotal: 0,
        materialsAndPartsSubtotal: 0,
        serviceDescriptionSubtotal: 0,
      },
    };
  },
  methods: {
    async submitForm() {
      this.isError = false;
      if (this.pdf.invoiceTotalAmount < 1) {
        this.isError = true;
        return;
      }
      try {
        const pdfBuffer = await post("/pdf", this.pdf, {
          responseType: "blob",
        });

        const blob = new Blob([pdfBuffer], { type: "application/pdf" });

        // Create a URL for the Blob object
        const url = window.URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement("a");
        link.href = url;
        link.download = "invoice.pdf"; // Set the download attribute with the desired file name

        // Append the link to the document body
        document.body.appendChild(link);

        // Click the link to trigger the download
        link.click();

        setTimeout(() => {
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        }, 200);
      } catch (error) {
        console.error("Error downloading PDF:", error);
        // Handle error
      }
    },
    calTotal(dictionary) {
      let total = 0;
      for (let i = 0; i < this.pdf[dictionary].length; i++) {
        const { quantity, rate } = this.pdf[dictionary][i];
        this.pdf[dictionary][i].amount = quantity * rate;
        total += this.pdf[dictionary][i].amount;
      }
      this.pdf[dictionary + "Subtotal"] = total;
      this.pdf.invoiceTotalAmount =
        this.pdf.materialsAndPartsSubtotal +
        this.pdf.parkingAndTollsSubtotal +
        this.pdf.serviceDescriptionSubtotal;
    },
    addRow(dictionary) {
      this.pdf[dictionary].push({
        date: "",
        quantity: 0,
        rate: 0,
        amount: 0,
      });
    },
    removeRow(dictionary, index) {
      this.pdf[dictionary].splice(index, 1);
      this.calTotal(dictionary);
    },
    logout() {
      removeToken();
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
