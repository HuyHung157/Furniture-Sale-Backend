import { EnvironmentService } from "src/infrastructure/environment/environment.service";
import fs = require('fs');

const envService = new EnvironmentService();

fs.writeFileSync('ormconfig.json',
  JSON.stringify(envService.getTypeOrmConfig(), null, 2)
)