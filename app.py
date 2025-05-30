import streamlit as st
from supabase import create_client, Client
import pandas as pd

# Supabase credentials
SUPABASE_URL = "https://hfwiximcfttzvqzwsatg.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhmd2l4aW1jZnR0enZxendzYXRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5MTk3NzEsImV4cCI6MjA1NjQ5NTc3MX0.GtEGe2KYbsA_sxPP8Of921SmBSEv6MQ49HB7JNafXLQ"
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Fake user ID (until auth is added)
FAKE_USER_ID = 1

# Custom CSS for purple theme
st.markdown("""
    <style>
    body {
        background-color: #4B0082; /* Dark purple */
        color: #FFFFFF;
    }
    .stApp {
        background-color: #4B0082;
    }
    .stTextInput > div > div > input, .stTextArea > div > div > textarea {
        background-color: #6B0082; /* Slightly lighter purple */
        color: #FFFFFF;
        border-radius: 0.5rem;
    }
    .stButton > button {
        background-color: #9333EA; /* Bright purple */
        color: #FFFFFF;
        border-radius: 0.5rem;
    }
    .stButton > button:hover {
        background-color: #A855F7; /* Lighter purple on hover */
    }
    h1, h2 {
        color: #D8B4FE; /* Light purple for headers */
    }
    p {
        color: #C4B5FD; /* Slightly muted purple text */
    }
    </style>
""", unsafe_allow_html=True)

# Title
st.title("Bookshelf - Share & Find Books")

# Donate Section
st.header("Donate a Book")
with st.form(key="donate_form"):
    book_name = st.text_input("Book Name", placeholder="Book Name")
    donor_name = st.text_input("Your Name", placeholder="Enter Your Name")
    mobile_number = st.text_input("Mobile Number", placeholder="Mobile Number")
    address = st.text_area("Your Address", placeholder="Enter your address")
    submit_button = st.form_submit_button(label="Donate Book")

    if submit_button:
        if not all([book_name, donor_name, mobile_number, address]):
            st.error("Please fill in all fields.")
        else:
            book_data = {
                "user_id": FAKE_USER_ID,
                "book_name": book_name,
                "donor_name": donor_name,
                "mobile_number": mobile_number,
                "address": address
            }
            try:
                response = supabase.table("bookshelf").insert(book_data).execute()
                if response.data:
                    st.success("Book donated successfully!")
                else:
                    st.error("Error donating book.")
            except Exception as e:
                st.error(f"Error donating book: {str(e)}")

# Browse Section
st.header("Available Books")
search_term = st.text_input("Search by book name...", placeholder="Search by book name")

try:
    query = supabase.table("bookshelf").select("*").eq("status", "available")
    if search_term:
        query = query.ilike("book_name", f"%{search_term}%")
    response = query.execute()

    if response.data:
        books = response.data
        df = pd.DataFrame(books, columns=["book_name", "donor_name", "mobile_number", "address"])
        # Display books in a grid-like format
        for i, book in enumerate(books):
            col1, col2 = st.columns([1, 2])
            with col1:
                st.write(f"**{book['book_name']}**")
            with col2:
                st.write(f"Donor: {book['donor_name']} | Mobile: {book['mobile_number']} | Address: {book['address']}")
            st.markdown("---")
    else:
        st.write("No books available yet." if not search_term else "No matching books found.")
except Exception as e:
    st.error(f"Error loading books: {str(e)}")
