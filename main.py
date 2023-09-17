import json
import os

# Read the JSON file
with open('all-links.json', 'r') as f:
    domains = json.load(f)

# Dictionary to store the sorted domains
sorted_domains = {}

# Iterate over each domain
for domain in domains:
    domain_parts = domain.split('.')
    domain_type = domain_parts[-1]
    first_two_letters = domain_parts[0][:2].lower()
    length_category = str(len(domain))

    # Create categories in the dictionary
    if domain_type not in sorted_domains:
        sorted_domains[domain_type] = {}

    if first_two_letters not in sorted_domains[domain_type]:
        sorted_domains[domain_type][first_two_letters] = {}

    if length_category not in sorted_domains[domain_type][first_two_letters]:
        sorted_domains[domain_type][first_two_letters][length_category] = []

    # Append the domain to the corresponding category
    sorted_domains[domain_type][first_two_letters][length_category].append(domain)

# Write the sorted domains to JSON files based on categories
base_path = 'filter'  # Main folder where the results will be saved

for domain_type, sub_data in sorted_domains.items():
    for first_two, lengths in sub_data.items():
        for length_category, domain_list in lengths.items():
            dir_path = os.path.join(base_path, domain_type, first_two)
            os.makedirs(dir_path, exist_ok=True)
            with open(os.path.join(dir_path, f"{length_category}.json"), 'w') as out_file:
                json.dump(domain_list, out_file, indent=4)

print("Domains have been categorized and saved!")