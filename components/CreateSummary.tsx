import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Plus, X } from "lucide-react-native";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import * as DocumentPicker from "expo-document-picker";

type FormState = {
  bookName: string;
  author: string;
  document: DocumentPicker.DocumentPickerResult | null;
};

const initialFormState: FormState = {
  bookName: "",
  author: "",
  document: null,
};

export default function CreateSummary({ style }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formState, setFormState] = useState<FormState>(initialFormState);

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "application/epub+zip", "text/plain"],
        copyToCacheDirectory: true,
        multiple: false,
      });

      setFormState((prev) => ({
        ...prev,
        document: result,
      }));
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  const handleSubmit = () => {
    // TODO: Implement summary creation logic
    console.log(formState);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setFormState(initialFormState);
  };

  const updateFormField = (field: keyof FormState, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <View style={style}>
      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setIsModalVisible(true)}
      >
        <Plus size={24} color="#000000" />
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <Pressable style={styles.modalOverlay} onPress={handleCloseModal}>
          <Pressable
            style={styles.modalContainer}
            onPress={(e) => e.stopPropagation()}
          >
            <Card style={styles.modalContent}>
              {/* Close Button */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseModal}
              >
                <X size={24} color="#ffffff" />
              </TouchableOpacity>

              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>Create a New Summary</Text>
                <Text style={styles.subtitle}>
                  Enter the book details below to get started.
                </Text>
              </View>

              {/* Form */}
              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Book Name</Text>
                  <Input
                    value={formState.bookName}
                    onChangeText={(value) => updateFormField("bookName", value)}
                    placeholder="e.g., The Great Gatsby"
                    placeholderTextColor={"white"}
                    style={{
                      color: "white",
                      borderColor: "white",
                      borderWidth: 1,
                      borderRadius: 8,
                      paddingHorizontal: 8,
                    }}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Author</Text>
                  <Input
                    value={formState.author}
                    onChangeText={(value) => updateFormField("author", value)}
                    placeholder="e.g., F. Scott Fitzgerald"
                    placeholderTextColor={"white"}
                    style={{
                      color: "white",
                      borderColor: "white",
                      borderWidth: 1,
                      borderRadius: 8,
                      paddingHorizontal: 8,
                    }}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Book Document</Text>
                  <TouchableOpacity
                    style={[
                      styles.documentPicker,
                      formState.document?.assets?.[0] &&
                        styles.documentPickerActive,
                    ]}
                    onPress={handlePickDocument}
                  >
                    <Text style={styles.documentPickerText}>
                      {formState.document?.assets?.[0]?.name ||
                        "Tap to upload PDF, EPUB, or TXT"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <Pressable
                  onPress={handleSubmit}
                  style={styles.createSummaryBtn}
                >
                  <Text style={styles.buttonText}>Create Summary</Text>
                </Pressable>
              </View>
            </Card>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFB703",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    maxWidth: 400,
  },
  modalContent: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    borderColor: "rgba(255, 255, 255, 0.1)",
    padding: 24,
    borderRadius: 16,
  },
  closeButton: {
    position: "absolute",
    right: 16,
    top: 10,
    zIndex: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#999999",
    textAlign: "center",
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#999999",
    marginLeft: 4,
  },
  documentPicker: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderStyle: "dashed",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  documentPickerActive: {
    borderColor: "#FFB703",
    borderStyle: "solid",
  },
  documentPickerText: {
    color: "#999999",
    fontSize: 14,
  },
  createSummaryBtn: {
    backgroundColor: "#FFB703",
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 275,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
  },
});
