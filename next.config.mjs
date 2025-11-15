# ============================
# 3. Chat state + single-turn function
# ============================

# Global conversation history
chat_history = [
    {
        "role": "system",
        "content": (
            "You are an expert assistant in systems engineering, "
            "digital thread, ontologies, and aerospace. "
            "Be clear, concise, and practical."
        ),
    }
]

def chat_once(user_message,
              max_new_tokens=512,
              temperature=0.7,
              top_p=0.9,
              show_user=True):
    """
    Send one user message, get one model reply, and update history.
    """
    global chat_history

    # Add user message to history
    chat_history.append({"role": "user", "content": user_message})

    # Build model input
    input_ids = build_input_ids_from_history(chat_history)

    # Generate
    with torch.no_grad():
        output_ids = model.generate(
            input_ids,
            max_new_tokens=max_new_tokens,
            do_sample=True,
            temperature=temperature,
            top_p=top_p,
        )

    # Decode only the newly generated tokens
    generated_ids = output_ids[0][input_ids.shape[-1]:]
    assistant_reply = tokenizer.decode(generated_ids, skip_special_tokens=True).strip()

    # Update history
    chat_history.append({"role": "assistant", "content": assistant_reply})

    # Pretty print
    if show_user:
        print(f"\nYou: {user_message}\n")
    print(f"Assistant: {assistant_reply}\n")

    return assistant_reply

