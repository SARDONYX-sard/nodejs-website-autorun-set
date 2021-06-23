# 貢献についての指針

> これは次のリンクの引用です。 [next-typed-routes's contributing guidelines](https://github.com/jagaapple/next-typed-routes/blob/master/.github/CONTRIBUTING.md)

## 言語

Gitのブランチ名やコミットメッセージ、GitHubのプルリクエストは、世界中の開発者が読めるように、英語で書かれていなければなりません。
世界中の開発者が読みやすいように、英語で書かれている必要があります。

## Gitブランチフロー

このプロジェクトの開発には、GitHub Flow を採用しています。`main`ブランチにあるものはすべてデプロイ可能です。
何か新しいことに取り組むにはブランチを作成し、その名前にはプレフィックスとして`feature/` を追加します。
ブランチ名は動詞で始まり、できるだけ簡潔でわかりやすいものにします。

```bash
# 例
feature/implement-xxx
feature/support-xxx-for-xxx
feature/fix-xxx-bugs
```

For more details, see [GitHub Flow – Scott Chacon](http://scottchacon.com/2011/08/31/github-flow.html).

## Gitコミットメッセージ規約

Gitのコミットメッセージは、以下のフォーマットにしたがってください。

```bash
# Format
<COMMIT_TYPE>: <SUMMARY>

- <DESCRIPTION>
- <DESCRIPTION>
- <DESCRIPTION>
```

### `<COMMIT_TYPE>`

1つのコミットの目的は1つだけで、コミットメッセージの1行目の先頭に以下のようなコミットタイプを追加します。
メッセージを追加します。

| TYPE     | USE CASE                                  | COMMENTS                                  |
| :------- | :---------------------------------------- | ----------------------------------------- |
| `Add`    | 機能の実装/ファイルの追加/新しいプラットフォームのサポート            |                                           |
| `Change` | 現在の仕様を変更する                                | 破壊的変更があった場合にこのタイプを使用し、それ以外は使用しないでください。 |
| `Fix`    | バグフィックス                                   | バグを修正するときにこのタイプを使用してください。                 |
| `Modify` | 文言の修正                                     | 破壊的変更がなく、バグ以外の修正を行う場合にこのタイプを使用してください。  |
| `Clean`  | いくつかのコードをリファクタリングする/クラス、メソッド、または変数をリネームする |                                           |
| `Remove` | 必要のないファイルやライブラリを削除します。                    |                                           |
| `Update` | 依存関係やこのプロジェクトのバージョンを更新します。                |                                           |

```bash
# Example
[Add] Implement sign up system
[Clean] Rename XXXClass to YYYClass

# BAD
[Add]Implement sign up system
<Add> Implement sign up system
[ADD] Implement sign up system
[add] Implement sign up system
Add Implement sign up system
```

### `<SUMMARY>`

`<SUMMARY>`（概要）は変更点をまとめたもので、コミットタイプを含めて50文字以内とします。ピリオド `.` は含まないでください。
また、小文字で始めます。

```bash
# Example
[Add] Implement sign up system
[Clean] Rename XXXClass to YYYClass

# BAD
[Add] implement sign up system
[Add] Implement sign up system. Because ...
```

### `<DESCRIPTION>` (Optional)

`<DESCRIPTION>` は、そのコミットで変更された内容の説明です。大文字から始めて、1行ずつ記述します。
また、ピリオド `.` は含めないでください。

```bash
# Example
[Add] Implement sign up system

- Add sign up pages
- Add sign up form styles

# BAD
[Add] Implement sign up system
- Add sign up pages
- Add sign up form styles

# BAD
[Add] Implement sign up system

- Add sign up pages.
- Add sign up form styles.

# BAD
[Add] Implement sign up system

- add sign up pages
- add sign up form styles
```
