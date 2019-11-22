import { workspace } from "vscode";
const DefaultIndent = "\t";
const Space = " ";
/**
 * If detect Indentation is true,it will use config according to editor.insertSpaces and editor.tabSize.
 * Otherwise it will use tab or space depend on Pretty.Json.useTabs.
 */
export function getConfiguration(): string {
  let indent = DefaultIndent;
  let isTab: boolean = true;
  const customConfig = workspace.getConfiguration("Pretty.Json");
  const isDetectIndentation = customConfig.get("detectIndentation");

  const editorConfig = workspace.getConfiguration("editor");
  const isInsertSpaces = editorConfig.get("insertSpaces");

  const tabSize: number =
    customConfig.get("indentWidth") || editorConfig.get("tabSize") || 4;

  if (isDetectIndentation) {
    if (isInsertSpaces) {
      isTab = false;
    }
  } else {
    isTab = customConfig.get("useTabs") as boolean;
  }
  if (!isTab) {
    indent = Space.repeat(tabSize);
  }
  return indent;
}
