use reqwest;
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

    if let Value::Object(map) = domains {
        if let Some(Value::Array(domains)) = map.get("deny") {
            let mut domain_map: HashMap<String, Vec<String>> = HashMap::new();

            for domain in domains {
                if let Value::String(domain) = domain {
                    let domain_parts: Vec<&str> = domain.split('.').collect();
                    let domain_type = domain_parts.last().unwrap_or(&"unknown");
                    let first_two_letters = domain_parts[0].chars().take(2).collect::<String>().to_lowercase();

                    let key = format!("{}/{}/{}.json", domain_type, first_two_letters, domain.len());
                    domain_map
                        .entry(key)
                        .or_insert_with(Vec::new)
                        .push(domain.to_string());
                }
            }

            for (file_path, domain_list) in domain_map.iter() {
                let dir_path = base_path.join(Path::new(file_path).parent().unwrap());
                if !dir_path.exists() {
                    create_dir_all(&dir_path)?;
                }

                let pretty_json = serde_json::to_vec_pretty(domain_list)?;
                let file_path = base_path.join(file_path);
                let mut file = File::create(file_path)?;
                file.write_all(&pretty_json)?;
            }
        }
    }

    Ok(())
}
