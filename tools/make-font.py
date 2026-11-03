"""重新產生 fonts/serif.woff2（Noto Serif TC Bold 子集）。

收集 index.html 和 data.js 裡用到的所有字元，從原字型取子集。
用法（在 repo 根目錄執行）：
  pip install fonttools brotli
  curl -L -o /tmp/NotoSerifTC-Bold.otf https://github.com/notofonts/noto-cjk/raw/main/Serif/SubsetOTF/TC/NotoSerifTC-Bold.otf
  python3 tools/make-font.py /tmp/NotoSerifTC-Bold.otf
原字型檔約 8 MB，不要 commit 進 repo。
"""
import os
import subprocess
import sys
import tempfile

if len(sys.argv) < 2:
    sys.exit("請指定 Noto Serif TC Bold 原字型檔的路徑，用法見檔案開頭說明")

src = sys.argv[1]
text = ""
for name in ("index.html", "data.js"):
    with open(name, encoding="utf-8") as f:
        text += f.read()
chars = "".join(sorted({c for c in text if ord(c) > 0x20}))

with tempfile.NamedTemporaryFile("w", encoding="utf-8", suffix=".txt", delete=False) as f:
    f.write(chars)
    chars_file = f.name

subprocess.run(
    ["pyftsubset", src, f"--text-file={chars_file}", "--flavor=woff2",
     "--layout-features=*", "--output-file=fonts/serif.woff2"],
    check=True,
)
os.remove(chars_file)
print(f"完成：{len(chars)} 個字元，{os.path.getsize('fonts/serif.woff2') // 1024} KB")
