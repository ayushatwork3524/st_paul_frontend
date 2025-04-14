import { HiOutlinePencilAlt } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";

export const DocumentList = ({
  documents,
  setSelectedDocId,
  setIsDocumentOpen,
  handleAddDocument,
}) => {
  const openDocument = (base64Data, documentType) => {
    if (!base64Data) return;

    let base64String = base64Data.trim(); // Remove extra spaces

    // Infer MIME type
    let mimeType = "application/pdf"; // Default to PDF
    if (base64String.startsWith("/9j/")) {
      mimeType = "image/jpeg"; // JPEG (JPG)
    } else if (base64String.startsWith("iVBORw0KGgo=")) {
      mimeType = "image/png"; // PNG
    }

    // Convert Base64 to binary data
    const byteCharacters = atob(base64String);
    const byteNumbers = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const blob = new Blob([byteNumbers], { type: mimeType });
    const blobUrl = URL.createObjectURL(blob);

    // Open in new tab
    window.open(blobUrl, "_blank");

    // Cleanup memory
    setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
  };

  return (
    <div className="w-full bg-white  rounded-lg">
      {!documents || documents.length === 0 ? (
        <div className="flex gap-4">
          <p className="text-gray-500 italic py-4">No documents available </p>
          <div className="flex items-center justify-center">
            <button
              onClick={() => handleAddDocument()}
              className="px-4 py-2 cursor-pointer bg-blue-600 text-white hover:bg-blue-700 rounded-md"
            >
              Add
            </button>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-blue-100 text-gray-700 uppercase text-sm">
                <th className="p-3 border">Sr. No</th>
                <th className="p-3 border">Document Type</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <tr
                  key={doc.documentId}
                  className="border hover:bg-gray-100 transition"
                >
                  <td className="p-3 text-center border font-medium">
                    {index + 1}.
                  </td>
                  <td className="p-3 border">
                    <button
                      onClick={() =>
                        openDocument(doc.document, doc.documentType)
                      }
                      className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                    >
                      {doc.documentType}
                    </button>
                  </td>
                  <td className="p-3 flex justify-center items-center gap-4">
                    <button
                      onClick={() => {
                        setIsDocumentOpen(true);
                        setSelectedDocId(doc.documentId);
                      }}
                      className="text-green-600 hover:text-green-700 cursor-pointer transition transform hover:scale-110"
                    >
                      <HiOutlinePencilAlt size={25} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
