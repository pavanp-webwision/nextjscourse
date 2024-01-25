"use client";
import React, { useEffect, useState, useRef } from "react";
import { Button, Flex } from "@mantine/core";
import { useRouter } from "next/navigation";
import { getCategory, deleteQuery } from "../../../../services/api";
import DataTable from "react-data-table-component";
import { useReactToPrint } from "react-to-print";
import { Table, TableData, VisuallyHidden } from "@mantine/core";
import SCORM from 'scorm-api-wrapper';

export default function Category({ data }) {
  const elements = [
    { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
    { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
    { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
    { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
    { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
  ];

  const tableData: TableData = {
    caption: "Categories",
    head: [
      ...(data && Object.keys(data[1].attributes).map((val) => val)),
      "Actions",
    ],
    body:
      data &&
      data.map((val, index) => [
        ...Object.keys(val.attributes).map((val2) => val.attributes[val2]),
        <Flex gap={10}>
          <Button
            className="btn btn-outline btn-xs"
            onClick={(e) => handleEditClick()}
          >
            Edit
          </Button>
          <Button
            className="btn btn-outline btn-xs"
            onClick={(e) => handleDeleteClick(e, row.id)}
          >
            Delete
          </Button>
        </Flex>,
      ]),
  };

  const tableDataPrint: TableData = {
    caption: "Categories",
    head: [
      ...(data && Object.keys(data[1].attributes).map((val) => val)),
    ],
    body:
      data &&
      data.map((val, index) => [
        ...Object.keys(val.attributes).map((val2) => val.attributes[val2]),
      ]),
  };
  const [downloadLink, setDownloadLink] = useState("");
  const componentRef = useRef(null);

  const [clientRendered, setClientRendered] = useState("");

  useEffect(() => {

    console.log(SCORM)
    SCORM.version = "1.1"; // specify the SCORM version
    SCORM.initialize(); 
    setClientRendered("CLIENT RENDERED");
  }, []);

  const router = useRouter();
  //   const [data, setData] = useState();

  //   const fetchCategories = async () => {
  //     try {
  //       const response = await getCategory();
  //       if (response) setData(response?.data);
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //       // Handle error, such as displaying an error message
  //     }
  //   };

  //   useEffect(() => {
  //     // Function to fetch categories when the component mounts
  //     fetchCategories();
  //   }, []);

  useEffect(() => {
    console.log("data", data);
    // data && Object.keys(data[1].attributes).map(val => console.log(val))
    data &&
      data.map((val, index) =>
        Object.keys(val.attributes).map((val2) =>
          console.log(val.attributes[val2])
        )
      );
  }, [data]);

  const handleCreate = () => {
    console.log("added");
    router.push("/category/create");
  };

  const handleExport = () => {};

  const handleExportPdf = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: true,
    documentTitle: "category-data",
    onAfterPrint: () => alert("Pdf print success."),
  });

  // const handleExportPdf = () => {
  //   const printContents = document.getElementById("print-pdf")?.innerHTML
  //   var originalContents = document.body.innerHTML;
  //   document.body.innerHTML = printContents;
  //   window.print();
  //   document.body.innerHTML = originalContents;
  // }

  // const handleExportData = async () => {
  //   try {

  //     // Step 2: Create PDF from HTML using jsPDF and html2canvas
  //     const pdf = new jsPDF({
  //       unit: 'px',
  //       format: 'a3',
  //       orientation: 'l',
  //       putOnlyUsedFonts: true
  //     });

  //     pdf.setFontSize(15);

  //     const options = {
  //       scale: 1, // Adjust the scale value
  //       useCORS: true,
  //       logging: true,
  //       width: pdf.internal.pageSize.getWidth(),
  //       height: pdf.internal.pageSize.getHeight(),
  //     };

  //     await html2canvas(document.getElementById("pdf-container"), options).then(
  //       (canvas) => {
  //         const imgData = canvas.toDataURL("image/png");
  //         pdf.addImage(
  //           imgData,
  //           "PNG",
  //           10,
  //           10,
  //           pdf.internal.pageSize.getWidth(),
  //           pdf.internal.pageSize.getHeight()
  //         );
  //       }
  //     );

  //     // Step 3: Create a Blob from the PDF and set the download link
  //     const blob = pdf.output("blob");
  //     const pdfUrl = URL.createObjectURL(blob);

  //     setDownloadLink(pdfUrl);
  //   } catch (error) {
  //     console.log("Error:", error);
  //   }
  // };

  const convertArrayOfObjectsToCSV = (array) => {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";

    if (!array || array.length === 0) {
      return null;
    }

    // Use the first object in the array to determine keys
    const attributesKeys = Object.keys(array[0].attributes);
    const keys = ["id", ...attributesKeys]; // Include 'id' in the keys

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        // Check if the current key is 'id' or part of 'attributes'
        result += key === "id" ? item[key] : item.attributes[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  };

  const downloadCSV = (array) => {
    console.log(array);
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  };

  const handleEditClick = () => {
    console.log("edited");
  };

  const handleDeleteClick = async (e, id) => {
    console.log("deleted");
    const response = await deleteQuery("categories", id);
    console.log("Delete response", response);
    // if (response.status === 200) {
    //   fetchCategories();
    // }
  };

  const headingStyles = {
    headCells: {
      style: {
        fontSize: "15px",
        fontWeight: "bold",
        justifyContent: "start",
      },
    },
    cells: {
      style: {
        fontSize: "15px",
        fontWeight: "normal",
        justifyContent: "start",
        flexGrow: "0",
      },
    },
    rows: {
      style: {
        minHeight: "72px", // override the row height
      },
    },
  };

  const columns = [
    {
      name: "id",
      selector: (row) => {
        return row?.id;
      },
      style: {},
    },
    {
      name: "name",
      selector: (row) => row?.attributes?.name,
      style: {},
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <Flex gap={10}>
          <Button
            className="btn btn-outline btn-xs"
            onClick={(e) => handleEditClick()}
          >
            Edit
          </Button>
          <Button
            className="btn btn-outline btn-xs"
            onClick={(e) => handleDeleteClick(e, row.id)}
          >
            Delete
          </Button>
          {/* <Button hiddenFrom="sm" color="orange">
            Hidden from sm
          </Button>
          <Button visibleFrom="sm" color="cyan">
            Visible from sm
          </Button>
          <Button visibleFrom="md" color="pink">
            Visible from md
          </Button> */}
        </Flex>
      ),
      style: {
        // Add any styling you want for the 'id' column
        flexGrow: 1,
        justifyContent: "end",
      },
    },
  ];

  const Export = ({ onExport }) => (
    <Button
      onClick={(e) => {
        onExport(e.target.value);
      }}
    >
      Export
    </Button>
  );

  const actionsMemo = React.useMemo(
    () => <Export onExport={() => downloadCSV(data)} />,
    []
  );

  return (
    <div style={{ width: "100%" }}>
      <Button onClick={handleCreate}>Create</Button>
      <Button className="ml-5" onClick={handleExport}>
        Export
      </Button>
      <Button className="ml-5" onClick={handleExportPdf}>
        Export Data to PDF
      </Button>
      {/* <Button className="ml-5" onClick={handleExportFrontEnd}>Export Frontend</Button> */}
      <Table data={tableData} />
      <div ref={componentRef} id="print-pdf">
        <div className="hidden-for-print hidden">
          <Table data={tableDataPrint} />
        </div>
        <style jsx global>{`
          @media print {
            .hidden-for-print {
              display: block !important;
            }

            /* You can add additional print-specific styles here */
          }
        `}</style>
        {/* <DataTable
          columns={columns}
          data={data}
          customStyles={headingStyles}
          actions={actionsMemo}
        /> */}
      </div>
    </div>
  );
}

// export const getServerSideProps = (context) => {

//   return {
//     props: context
//   }

// }
