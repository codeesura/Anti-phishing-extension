use serde_json::Value;
use std::collections::HashMap;
use std::fs::{create_dir_all, File};
use std::io::Write;
use std::path::Path;

const URL: &str = "https://raw.githubusercontent.com/polkadot-js/phishing/master/all.json";

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let response = reqwest::get(URL).await?.text().await?;
    let domains: Value = serde_json::from_str(&response)?;

    let base_path = Path::new("filter");

    let mut all_domains = Vec::new();

    if let Value::Object(map) = domains {
        if let Some(Value::Array(domains)) = map.get("deny") {
            let mut domain_map: HashMap<String, Vec<String>> = HashMap::new();

            for domain in domains {
                if let Value::String(domain) = domain {
                    all_domains.push(domain.to_string());

                    let domain_parts: Vec<&str> = domain.split('.').collect();

                    let domain_type = domain_parts
                        .last()
                        .map(|s| s.trim_start_matches('/'))
                        .filter(|s| !s.is_empty())
                        .unwrap_or("unknown");

                    let first_part = domain_parts
                        .first()
                        .map(|s| s.trim_start_matches('/'))
                        .filter(|s| !s.is_empty())
                        .unwrap_or("unknown");

                    let first_two_letters = first_part
                        .chars()
                        .take(2)
                        .collect::<String>()
                        .to_lowercase();

                    let key = format!(
                        "{}/{}/{}.json",
                        domain_type,
                        first_two_letters,
                        domain.len()
                    );
                    domain_map.entry(key).or_default().push(domain.to_string());
                }
            }

            for (file_path, domain_list) in domain_map.iter() {
                let full_path = base_path.join(Path::new(file_path));

                if !full_path.starts_with(base_path) {
                    eprintln!("Skipping invalid path: {}", full_path.display());
                    continue;
                }

                if let Some(parent) = full_path.parent() {
                    if !parent.exists() {
                        println!("Creating directory: {}", parent.display());
                        create_dir_all(&parent)?;
                    }
                }

                let pretty_json = serde_json::to_vec_pretty(domain_list)?;
                let mut file = File::create(&full_path)?;
                file.write_all(&pretty_json)?;
                println!("Created file: {}", full_path.display());
            }
        }
    }

    let all_domains_path = Path::new("phishing-sites-list.json");
    let pretty_json = serde_json::to_vec_pretty(&all_domains)?;
    let mut file = File::create(all_domains_path)?;
    file.write_all(&pretty_json)?;

    Ok(())
}
