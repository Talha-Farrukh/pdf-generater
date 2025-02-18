import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";
import { InvoiceFormData } from "../hooks/useInvoiceForm";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    paddingBottom: 5,
    borderBottom: "1 solid #000",
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    width: 120,
    color: "#666",
  },
  value: {
    flex: 1,
  },
  table: {
    marginTop: 20,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
    paddingBottom: 5,
    marginBottom: 5,
    backgroundColor: "#f5f5f5",
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  col1: {
    width: "10%",
  },
  col2: {
    width: "60%",
  },
  col3: {
    width: "30%",
    textAlign: "right",
  },
  total: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: "#000",
    paddingTop: 5,
  },
  footer: {
    marginTop: 30,
    fontSize: 10,
    color: "#666",
    textAlign: "center",
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: "#eee",
    marginVertical: 15,
  },
});

interface PDFDocumentProps {
  invoiceData: InvoiceFormData;
}

export const PDFDocument = ({ invoiceData }: PDFDocumentProps) => {
  const amount = invoiceData.hours * invoiceData.ratePerHour;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>INVOICE</Text>
        </View>

        {/* Invoice Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Invoice Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Invoice Number:</Text>
            <Text style={styles.value}>{invoiceData.invoiceNumber}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>
              {format(invoiceData.date, "do MMM yyyy")}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Bill to:</Text>
            <Text style={styles.value}>{invoiceData.billTo}</Text>
          </View>
        </View>

        {/* Client Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Full Name:</Text>
            <Text style={styles.value}>{invoiceData.accountHolderName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{invoiceData.email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>CNIC Number:</Text>
            <Text style={styles.value}>{invoiceData.cnicNumber}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{invoiceData.address}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Contact Number:</Text>
            <Text style={styles.value}>{invoiceData.contactNumber}</Text>
          </View>
        </View>

        {/* Services Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.col1}>Item</Text>
              <Text style={styles.col2}>Description</Text>
              <Text style={styles.col3}>Amount</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.col1}>1.</Text>
              <Text style={styles.col2}>
                Hours worked - {invoiceData.hours} Hours
              </Text>
              <Text style={styles.col3}>
                {amount.toLocaleString()} {invoiceData.currency}
              </Text>
            </View>
          </View>

          <View style={styles.total}>
            <View style={styles.tableRow}>
              <Text style={styles.col1}></Text>
              <Text style={styles.col2}>Total</Text>
              <Text style={styles.col3}>
                {amount.toLocaleString()} {invoiceData.currency}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Payment Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Account Holder:</Text>
            <Text style={styles.value}>{invoiceData.accountHolderName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Bank Name:</Text>
            <Text style={styles.value}>{invoiceData.bankName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Account Number:</Text>
            <Text style={styles.value}>{invoiceData.accountNumber}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>IBAN:</Text>
            <Text style={styles.value}>{invoiceData.iban}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>
            If you have any questions about this invoice, please contact at{" "}
            {invoiceData.contactNumber}
          </Text>
        </View>
      </Page>
    </Document>
  );
};
