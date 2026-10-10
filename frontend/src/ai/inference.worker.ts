
import * as ort from "onnxruntime-web";

// Store the loaded ONNX model
let session: ort.InferenceSession | null = null;

// Define messages received by the worker
type WorkerRequest =
  | {
      id: string;
      type: "LOAD_MODEL";
    }
  | {
      id: string;
      type: "RUN_INFERENCE";
      payload: ort.InferenceSession.OnnxValueMapType;
    };

// Listen for messages from the React application
self.onmessage = async (
  event: MessageEvent<WorkerRequest>
) => {
  const { id, type } = event.data;

  try {
    // STEP 1: Load the ONNX model
    if (type === "LOAD_MODEL") {
      session = await ort.InferenceSession.create(
        "/models/scamshield-v1/model.onnx",
        {
          executionProviders: ["wasm"],
        }
      );

      self.postMessage({
        id,
        type: "MODEL_READY",
      });

      return;
    }

    // STEP 2: Run AI inference
    if (type === "RUN_INFERENCE") {
      if (!session) {
        throw new Error("Model is not loaded yet.");
      }

      // Run the model using tokenized input tensors
      const outputs = await session.run(
        event.data.payload
      );

      // Get the model output
      const outputTensor =
        outputs["logits"] ??
        Object.values(outputs)[0];

      if (!outputTensor) {
        throw new Error("Model returned no output.");
      }

      // Verify the output is a tensor
      if (!(outputTensor instanceof ort.Tensor)) {
        throw new Error(
          "Model output is not a valid tensor."
        );
      }

      // Convert tensor data into a number array
     const tensor = outputTensor as ort.Tensor;

        const logits: number[] = Array.from(
        tensor.data as ArrayLike<number | bigint>,
        (value) => Number(value)
        );

      // Send the result back to React
      self.postMessage({
        id,
        type: "INFERENCE_RESULT",
        logits,
      });

      return;
    }

    throw new Error("Unknown worker request type.");

  } catch (error) {
    self.postMessage({
      id,
      type: "ERROR",
      message:
        error instanceof Error
          ? error.message
          : String(error),
    });
  }
};

export {};
