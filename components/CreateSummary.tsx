import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Plus, X } from "lucide-react-native";
import { Input } from "~/components/ui/input";
import { Card } from "~/components/ui/card";
import * as DocumentPicker from "expo-document-picker";
import { llm_summarize_book } from "~/hooks/useSummaryBot";
import * as FileSystem from "expo-file-system";
import { db } from "~/lib/db";
import { summaries } from "~/db/schema";
import { color } from "~/lib/rcPicker";

type NewSummary = typeof summaries.$inferInsert;

type FormState = {
  bookName: string;
  author: string;
  document: any; // now includes base64
};

const initialFormState: FormState = {
  bookName: "",
  author: "",
  document: null,
};

export default function CreateSummary({ style, onBookAdded }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [_error, setError] = useState<string | null>(null);

  const insertUser = async (summary: NewSummary) => {
    return db.insert(summaries).values(summary);
  };

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "application/epub+zip", "text/plain"],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        const base64 = await FileSystem.readAsStringAsync(file.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        setFormState((prev) => ({
          ...prev,
          document: {
            ...file,
            base64, // added base64 here
          },
        }));
      }
    } catch (error: any) {
      setError("Error picking document: " + (error?.message || String(error)));
      console.error("Error picking document:", error);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!formState.document?.base64 || !formState.document?.name) {
        setError("No document selected");
        setLoading(false);
        return;
      }
      const response = await llm_summarize_book(
        formState.document.base64,
        formState.bookName
      );
      console.log("Summary generated:", response.answer);

      const dbData: NewSummary = {
        id: response.id,
        title: formState.bookName,
        author: formState.author,
        date: new Date().toISOString(),
        duration: null,
        color: color,
        summary: response.answer as string,
      };
      await insertUser(dbData);
      if (onBookAdded) onBookAdded();
      handleCloseModal();
    } catch (err: any) {
      setError("Failed to summarize book: " + (err?.message || String(err)));
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setError(null);
    setFormState(initialFormState);
  };

  const updateFormField = (field: keyof FormState, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDeleteItems = async () => {
    try {
      await db.delete(summaries);
      console.log("All items deleted successfully");
    } catch (error) {
      console.error("Error deleting items:", error);
    }
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
                <Text style={[styles.title as any]}>Create a New Summary</Text>
                <Text style={[styles.subtitle as any]}>
                  Enter the book details below to get started.
                </Text>
              </View>

              {/* Form */}
              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <Text style={[styles.label as any]}>Book Name</Text>
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
                  <Text style={[styles.label as any]}>Author</Text>
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
                  <Text style={[styles.label as any]}>Book Document</Text>
                  <TouchableOpacity
                    style={[
                      styles.documentPicker,
                      formState.document?.name && styles.documentPickerActive,
                    ]}
                    onPress={handlePickDocument}
                  >
                    <Text style={[styles.documentPickerText as any]}>
                      {formState.document?.name ||
                        "Tap to upload PDF, EPUB, or TXT"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <Pressable
                  onPress={handleSubmit}
                  style={styles.createSummaryBtn}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#000" />
                  ) : (
                    <Text style={[styles.buttonText as any]}>
                      Create Summary
                    </Text>
                  )}
                </Pressable>
                <Pressable
                  onPress={handleDeleteItems}
                  style={styles.createSummaryBtn}
                >
                  <Text>Delete Items</Text>
                </Pressable>
                {_error && (
                  <Text style={{ color: "red", marginTop: 8 }}>{_error}</Text>
                )}
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
