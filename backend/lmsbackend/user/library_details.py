import json

# Load the JSON data from the file
with open('libraries.json', 'r') as file:
    library_data = json.load(file)

# Function to display the library location
def display_library_location(data):
    address = data["library"]["address"]
    location = (f'{address["street"]}, {address["city"]}, '
                f'{address["state"]} {address["zip_code"]}, {address["country"]}')
    print("Library Location:")
    print(location)
    print()

# Function to display the library hours
def display_library_hours(data):
    hours = data["library"]["hours"]
    print("Library Hours:")
    for day, time in hours.items():
        print(f"{day.capitalize()}: {time}")
    print()

def check_open(library_data, day, time):
    hours = library_data["library"]["hours"]
    if day in hours:
        open_time, close_time = hours[day].split(" - ")
        if open_time <= time < close_time:
            return True
    return False

def main():
    # Display the library location and hours
    display_library_location(library_data)
    display_library_hours(library_data)
    open = check_open(library_data, "Monday", "10:00")
    print(open)

if __name__ == "__main__":
    main()