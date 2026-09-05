import { useState } from "react";
import axios from "axios";

import UploadCard from "../components/UploadCard";
import ResultsChart from "../components/ResultsChart";

import {
  uploadDataset,
  askQuestion,
} from "../services/api";

import {
  saveQueryToHistory,
  getQueryHistory,
} from "../utils/history";

import type {
  QueryHistoryItem,
} from "../utils/history";

type ColumnInfo = {
  name: string;
  type: string;
  missing: number;
  unique: number;
};

type UploadResponse = {
  dataset_id: string;
  filename: string;
  table_name: string;
  rows: number;
  rows_loaded: number;
  columns: ColumnInfo[];
};

type QueryResponse = {
  sql: string;
  columns: string[];
  rows: unknown[][];
};

export default function Workspace() {
  const [datasetId, setDatasetId] =
    useState("");

  const [fileName, setFileName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [uploadInfo, setUploadInfo] =
    useState<UploadResponse | null>(
      null
    );

  const [question, setQuestion] =
    useState("");

  const [asking, setAsking] =
    useState(false);

  const [answer, setAnswer] =
    useState<QueryResponse | null>(
      null
    );

  const [copied, setCopied] =
    useState(false);

  const [chartType, setChartType] =
    useState<
      | "bar"
      | "pie"
      | "scatter"
      | "histogram"
    >("bar");

  const [history, setHistory] =
    useState<QueryHistoryItem[]>(
      getQueryHistory()
    );

  async function handleUpload(
    file: File
  ) {
    try {
      setLoading(true);

      const result: UploadResponse =
        await uploadDataset(file);

      setDatasetId(
        result.dataset_id
      );

      setFileName(
        result.filename
      );

      setUploadInfo(result);
    } catch (error: unknown) {
      console.error(error);

      if (
        axios.isAxiosError(error)
      ) {
        alert(
          error.response?.data
            ?.detail ??
            error.message
        );
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleAsk() {
    if (!datasetId) {
      alert(
        "Upload a dataset first"
      );
      return;
    }

    if (!question.trim()) {
      alert("Enter a question");
      return;
    }

    try {
      setAsking(true);

      const result: QueryResponse =
        await askQuestion(
          datasetId,
          question
        );

      setAnswer(result);

      saveQueryToHistory(
        question,
        result.sql
      );

      setHistory(
        getQueryHistory()
      );
    } catch (error) {
      console.error(error);

      alert("Question failed");
    } finally {
      setAsking(false);
    }
  }

  async function handleCopySql() {
    if (!answer) return;

    await navigator.clipboard.writeText(
      answer.sql
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  function handleQuestionKeyDown(
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();

      if (!asking) {
        handleAsk();
      }
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-white transition-colors duration-300">

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">

  <div
    className="absolute top-[-150px] left-[-150px] h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-3xl"
    style={{
      animation:
        "float 18s ease-in-out infinite",
    }}
  />

  <div
    className="absolute bottom-[-200px] right-[-150px] h-[600px] w-[600px] rounded-full bg-purple-500/20 blur-3xl"
    style={{
      animation:
        "float 24s ease-in-out infinite reverse",
    }}
  />

  <div
    className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl"
    style={{
      animation:
        "float 30s ease-in-out infinite",
    }}
  />

</div>
      <div className="relative z-10 max-w-6xl mx-auto p-10">

        <h1 className="text-5xl font-bold mb-10">
          QueryMind Workspace
        </h1>

        <UploadCard
          onSelect={handleUpload}
        />

        {loading && (
          <p className="mt-4 text-cyan-500">
            Uploading dataset...
          </p>
        )}

        {uploadInfo && (
          <div className="mt-8 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-xl p-6">

            <h2 className="text-2xl font-semibold mb-4">
              Dataset Loaded
            </h2>

            <p>
              <strong>File:</strong>{" "}
              {fileName}
            </p>

            <p>
              <strong>Rows:</strong>{" "}
              {uploadInfo.rows}
            </p>

            <p>
              <strong>Table:</strong>{" "}
              {
                uploadInfo.table_name
              }
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {uploadInfo.columns.map(
                (column) => (
                  <span
                    key={
                      column.name
                    }
                    className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/20"
                  >
                    {column.name}
                  </span>
                )
              )}
            </div>

          </div>
        )}

        {datasetId && (
          <div className="mt-8 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-6 shadow-sm">

            <h2 className="text-2xl font-semibold mb-4">
              Ask QueryMind
            </h2>

            <textarea
              value={question}
              onChange={(e) => {
                setQuestion(
                  e.target.value
                );

                e.target.style.height =
                  "auto";

                e.target.style.height =
                  `${e.target.scrollHeight}px`;
              }}
              onKeyDown={
                handleQuestionKeyDown
              }
              rows={1}
              placeholder="Ask anything about your dataset..."
              className="w-full min-h-[60px] max-h-[300px] resize-none overflow-auto rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 p-4 outline-none"
            />

            <button
              onClick={handleAsk}
              disabled={asking}
              className="mt-4 px-6 py-3 rounded-xl bg-cyan-500 text-black font-semibold"
            >
              {asking
                ? "Thinking..."
                : "Ask"}
            </button>

          </div>
        )}

        {answer && (
          <div className="mt-8 rounded-2xl border border-green-500/20 bg-green-500/5 backdrop-blur-xl p-6">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-semibold">
                Generated SQL
              </h2>

              <button
                onClick={
                  handleCopySql
                }
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  copied
                    ? "bg-green-500 text-white"
                    : "bg-cyan-500 text-black"
                }`}
              >
                {copied
                  ? "Copied!"
                  : "Copy SQL"}
              </button>

            </div>

            <pre className="mt-4 overflow-auto text-green-500">
              {answer.sql}
            </pre>

            <h2 className="text-2xl font-semibold mt-8">
              Results
            </h2>

            <div className="mt-4 overflow-auto">
              <table className="min-w-full border border-slate-300 dark:border-slate-700">

                <thead>
                  <tr>
                    {answer.columns.map(
                      (
                        column
                      ) => (
                        <th
                          key={
                            column
                          }
                          className="border border-slate-300 dark:border-slate-700 p-3 text-left"
                        >
                          {column}
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                <tbody>
                  {answer.rows.map(
                    (
                      row,
                      index
                    ) => (
                      <tr
                        key={
                          index
                        }
                      >
                        {row.map(
                          (
                            value,
                            cellIndex
                          ) => (
                            <td
                              key={
                                cellIndex
                              }
                              className="border border-slate-300 dark:border-slate-700 p-3"
                            >
                              {String(
                                value
                              )}
                            </td>
                          )
                        )}
                      </tr>
                    )
                  )}
                </tbody>

              </table>
            </div>

            <div className="mt-8">

              <div className="flex items-center gap-3 mb-4">

                <span className="font-medium">
                  Chart Type:
                </span>

                <select
                  value={
                    chartType
                  }
                  onChange={(
                    e
                  ) =>
                    setChartType(
                      e.target
                        .value as
                        | "bar"
                        | "pie"
                        | "scatter"
                        | "histogram"
                    )
                  }
                  className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                >
                  <option value="bar">
                    Bar Chart
                  </option>

                  <option value="pie">
                    Pie Chart
                  </option>

                  <option value="scatter">
                    Scatter Plot
                  </option>

                  <option value="histogram">
                    Histogram
                  </option>
                </select>

              </div>

              <ResultsChart
                columns={
                  answer.columns
                }
                rows={answer.rows}
                chartType={
                  chartType
                }
              />

            </div>

          </div>
        )}

        {history.length > 0 && (
          <div className="mt-8 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-6 shadow-sm">

            <h2 className="text-2xl font-semibold mb-4">
              Query History
            </h2>

            <div className="space-y-4">

              {history.map(
                (
                  item,
                  index
                ) => (
                  <div
                    key={index}
                    className="rounded-xl border border-slate-300 dark:border-slate-700 p-4"
                  >
                    <p className="font-semibold">
                      {
                        item.question
                      }
                    </p>

                    <p className="text-xs opacity-70 mt-1">
                      {
                        item.timestamp
                      }
                    </p>

                    <pre className="mt-3 overflow-auto text-sm text-cyan-500">
                      {item.sql}
                    </pre>
                  </div>
                )
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}