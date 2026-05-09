 # Vaulty Architecture Notes

  ## Routing

  Explain what each route does:

  - /
  - /vault
  - /vault/[id]
  - /vault/[id]/note/[noteId]

  Answer: / - acceses the db to find all of the existing vaults, renders them and renders the log of the app. Since this is a server component, it is able to access db because the component runs on the server.

  /vault -  this will a shared layout for the vault pages (sidebar with the notes, search - basically evrything that is shared acrross different vaults)

  /vault/[id] - this is the page for the specific vault e.g. personal/193-292nomn2-01

  /vault/[id]/note/[noteId] - page for the specific note

  All files are server components by default, but if I plan to use hooks I will use "use client" directive

  ## Data Models

  Vault - model for our vault which is basically a big storage for the notes - it has id, name, description, array of notes, timestamps for created and updated

  Note - model for the note, it has id, title, content, relation 1 to many with vaultId as a foreign key and also timestamps for create =d and updated

  ## Why is ExistingVaultCard a client component?

  Because it is a pure reusable ui component and has nothing to do with server

  ## Current Gaps

  Ability to create, update, delete vaults. Vault page, sidebar, search for notes maybe auth, note tree, markdown editor, canvas.