// document.getElementById("userDetailsForm").addEventListener("submit", function(event) {
//     event.preventDefault(); // Prevent the default form submission

//     // Get user input values
//     const name = document.getElementById("name").value;
//     const email = document.getElementById("email").value;
//     const phone = document.getElementById("phone").value;
//     const caseType = document.getElementById("caseType").value; // Get case type

//     // Create a new jsPDF instance
//     const { jsPDF } = window.jspdf;
//     const doc = new jsPDF();

//     // Add user details to the PDF
//     doc.text(`Name: ${name}`, 10, 10);
//     doc.text(`Email: ${email}`, 10, 20);
//     doc.text(`Phone: ${phone}`, 10, 30);
//     doc.text(`Case Type: ${caseType}`, 10, 40); // Add case type

//     // Save the PDF and trigger download
//     doc.save("user-details.pdf");
// });
