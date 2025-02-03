import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import { format } from "date-fns"

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
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    width: 80,
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
  bankDetails: {
    marginTop: 30,
  },
  footer: {
    marginTop: 30,
    fontSize: 10,
  },
})

interface PDFDocumentProps {
  invoiceData: {
    invoiceNumber: string
    billTo: string
    date: Date
    hours: number
    ratePerHour: number
    bankName: string
    accountNumber: string
    iban: string
    contactNumber: string
    accountHolderName: string
  }
}

export const PDFDocument = ({ invoiceData }: PDFDocumentProps) => {
  const amount = invoiceData.hours * invoiceData.ratePerHour

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>INVOICE</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Invoice No:</Text>
            <Text style={styles.value}>{invoiceData.invoiceNumber}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Bill to:</Text>
            <Text style={styles.value}>{invoiceData.billTo}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{format(invoiceData.date, "do MMM yyyy")}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.col1}>Item</Text>
            <Text style={styles.col2}>Description</Text>
            <Text style={styles.col3}>Amount</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.col1}>1.</Text>
            <Text style={styles.col2}>Hours worked - {invoiceData.hours} Hours</Text>
            <Text style={styles.col3}>{amount.toLocaleString()} PKR</Text>
          </View>
        </View>

        <View style={styles.total}>
          <View style={styles.tableRow}>
            <Text style={styles.col1}></Text>
            <Text style={styles.col2}>Total</Text>
            <Text style={styles.col3}>{amount.toLocaleString()} PKR</Text>
          </View>
        </View>

        <View style={styles.bankDetails}>
          <Text>Bank Details:</Text>
          <Text>Account Holder Name: {invoiceData.accountHolderName}</Text>
          <Text>Bank Name: {invoiceData.bankName}</Text>
          <Text>Account Number: {invoiceData.accountNumber}</Text>
          <Text>IBAN: {invoiceData.iban}</Text>
        </View>

        <View style={styles.footer}>
          <Text>If you have any questions please contact: {invoiceData.contactNumber}</Text>
        </View>
      </Page>
    </Document>
  )
}

