import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { aws_lambda as lambda } from 'aws-cdk-lib'
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs'
import * as path from 'path'

export class LambdaLayerExampleStack extends cdk.Stack {

    public readonly layer: lambda.LayerVersion

    constructor(scope: Construct, id: string, props: cdk.StackProps){
        super(scope, id, props)

        this.layer = new lambda.LayerVersion(this, 'helper-layer', {
            layerVersionName: 'helper-alyer-two',
            description: 'private helper function are help here',
            code: lambda.Code.fromAsset('src/layers/helpers'),
            compatibleRuntimes: [
                lambda.Runtime.NODEJS_14_X,
                lambda.Runtime.NODEJS_16_X,
                lambda.Runtime.NODEJS_18_X,
            ]
        })

        const utilsLayer = new lambda.LayerVersion(this, 'utils-layer', {
            layerVersionName: 'utils-layer-one',
            description: 'includes all external dependencies',
            code: lambda.Code.fromAsset('src/layers/utils'),
            compatibleRuntimes: [
                lambda.Runtime.NODEJS_14_X,
                lambda.Runtime.NODEJS_16_X,
                lambda.Runtime.NODEJS_18_X,
            ]
        })

        const nodejsFnProps: NodejsFunctionProps = {
            runtime: lambda.Runtime.NODEJS_18_X,
            timeout: cdk.Duration.minutes(3),
            memorySize: 256,
            bundling: {
                externalModules: [
                  'aws-sdk', // Use the 'aws-sdk' available in the Lambda runtime,
                  'ulid',
                ],
            },
        }

        const lambdaWithLayer = new NodejsFunction(this, 'lambdaWithLayer', {
            functionName: 'lambdaWithLayer',
            entry: path.join(__dirname, '../src/lambdas', 'handler.ts'),
            handler: 'handler',
            layers: [this.layer, utilsLayer],
            ...nodejsFnProps,
        })
    }
}