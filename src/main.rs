use serde_json::Value;
use std::collections::HashMap;
use std::fs::{create_dir_all, File};
use std::io::Write;
use std::path::Path;

// Define the URL for phishing sites list
const URL: &str = "https://raw.githubusercontent.com/polkadot-js/phishing/master/all.json";

#[tokio::main]
/// Asynchronous main function to fetch phishing sites list and write to JSON files
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Fetch the response from the defined URL
    let response = reqwest::get(URL).await?.text().await?;
    // Parse the response into a serde_json Value
    let domains: Value = serde_json::from_str(&response)?;

    // Define the base path for the filter directory
    let base_path = Path::new("filter");

    // Initialize a vector to store all domains
    let mut all_domains = Vec::new();

    // Check if the parsed JSON is an object
    if let Value::Object(map) = domains {
        // Extract the "deny" field from the map, which is expected to be an array
        if let Some(Value::Array(domains)) = map.get("deny") {
            // Initialize a HashMap to store domains by key
            let mut domain_map: HashMap<String, Vec<String>> = HashMap::new();

            // Iterate through the "deny" domains
            for domain in domains {
                if let Value::String(domain) = domain {
                    // Add the domain to the all_domains vector
                    all_domains.push(domain.to_string());

                    // Split the domain by '.' to get the domain parts
                    let domain_parts: Vec<&str> = domain.split('.').collect();
                    let domain_type = domain_parts.last().unwrap_or(&"unknown");
                    // Extract the first two letters of the domain
                    let first_two_letters = domain_parts[0]
                        .chars()
                        .take(2)
                        .collect::<String>()
                        .to_lowercase();

                    // Create the key for the domain_map
                    let key = format!(
                        "{}/{}/{}.json",
                        domain_type,
                        first_two_letters,
                        domain.len()
                    );
                    // Add the domain to domain_map using the key
                    domain_map.entry(key).or_default().push(domain.to_string());
                }
            }

            // Iterate through the domain_map and write the domains to JSON files
            for (file_path, domain_list) in domain_map.iter() {
                let dir_path = base_path.join(Path::new(file_path).parent().unwrap());
                // Create the directory if it doesn't exist
                if !dir_path.exists() {
                    create_dir_all(&dir_path)?;
                }

                // Convert the domain_list to pretty JSON and write to file
                let pretty_json = serde_json::to_vec_pretty(domain_list)?;
                let file_path = base_path.join(file_path);
                let mut file = File::create(file_path)?;
                file.write_all(&pretty_json)?;
            }
        }
    }

    // Define the path for the phishing-sites-list.json file
    let all_domains_path = Path::new("phishing-sites-list.json");
    // Convert the all_domains vector to pretty JSON and write to file
    let pretty_json = serde_json::to_vec_pretty(&all_domains)?;
    let mut file = File::create(all_domains_path)?;
    file.write_all(&pretty_json)?;

    Ok(())
}
