#!/bin/bash

custom_org_name='"Grafana JSX StoryBook"'
dashboard_slug="grafana-jsx-storybook"

# STEP 1: Wait for the Grafana to be live
echo -e "\n"
grafana_status=0
while [ "$grafana_status" != "200" ]; do
    echo -e "Waiting for Grafana to be ready..."
    sleep 1s
    grafana_status=$(curl -s -o /dev/null -w "%{http_code}" -X POST -u admin:admin "http://127.0.0.1:3000/api/user/using/1")        
done

# STEP 2: Update the default home dashboard for the default Org
echo -e "Updating home dashboard..."

home_db=$(curl -s -X GET -u admin:admin http://127.0.0.1:3000/api/dashboards/db/${dashboard_slug} \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json')

home_db_id=$(echo "$home_db" | jq '.dashboard.id')

curl -s -X PUT -u admin:admin http://127.0.0.1:3000/api/org/preferences \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    -d "{\"homeDashboardId\": ${home_db_id}}" >/dev/null

# STEP 3: Change Org name to custom
echo -e "Updating default org to be called ${custom_org_name}..."

curl -s -X PUT -u admin:admin http://127.0.0.1:3000/api/org \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    -d "{\"name\": ${custom_org_name}}" >/dev/null

echo -e "Grafana configuration complete. Open on http://localhost:3000/"
